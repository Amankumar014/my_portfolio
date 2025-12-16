import React, { useEffect, useRef, useState } from 'react';
import { createClient, AnamEvent } from '@anam-ai/js-sdk';
import './AnamVoiceAssistant.css';

const statusCopy = {
  idle: 'Ready to start a voice session.',
  connecting: 'Connecting... grant microphone access if prompted.',
  connected: 'Live — say hello!',
  error: 'Something went wrong. Please try again.',
};

const AnamVoiceAssistant = () => {
  const videoRef = useRef(null);
  const anamClientRef = useRef(null);
  const userStreamRef = useRef(null);

  const [status, setStatus] = useState('idle'); // idle | connecting | connected | error
  const [error, setError] = useState('');
  const [permissionStatus, setPermissionStatus] = useState('unknown'); // unknown | granted | denied

  const stopUserStream = () => {
    if (userStreamRef.current) {
      userStreamRef.current.getTracks().forEach((track) => track.stop());
      userStreamRef.current = null;
    }
  };

  const teardownClient = async () => {
    const client = anamClientRef.current;
    anamClientRef.current = null;

    if (client?.stop) {
      await client.stop();
    } else if (client?.destroy) {
      client.destroy();
    } else if (client?.disconnect) {
      await client.disconnect();
    }
  };

  useEffect(() => {
    return () => {
      stopUserStream();
      teardownClient();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const requestMicrophone = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      setPermissionStatus('granted');
      userStreamRef.current = stream;
      return stream;
    } catch (err) {
      setPermissionStatus('denied');
      throw new Error('Microphone permission is required to start the session.');
    }
  };

  const startChat = async () => {
    if (status === 'connecting' || status === 'connected') return;

    setStatus('connecting');
    setError('');

    if (!navigator.mediaDevices?.getUserMedia) {
      setError('Microphone access is not supported in this browser.');
      setStatus('error');
      return;
    }

    try {
      const stream = await requestMicrophone();

      const response = await fetch('/api/session-token', { method: 'POST' });
      if (!response.ok) {
        const message = `Failed to get session token (${response.status})`;
        throw new Error(message);
      }

      const data = await response.json();
      const token = data?.sessionToken;
      if (!token) {
        throw new Error('Session token missing from server response.');
      }

      const client = createClient(token);
      anamClientRef.current = client;

      if (client?.addListener) {
        client.addListener(AnamEvent.SESSION_READY, () => {
          setStatus('connected');
        });

        client.addListener(AnamEvent.CONNECTION_STATE_CHANGED, (state) => {
          if (state === 'disconnected') {
            setStatus('idle');
            stopUserStream();
          }
        });

        client.addListener(AnamEvent.ERROR, (clientError) => {
          console.error('Anam client error:', clientError);
          setError(clientError?.message || 'Voice session error.');
          setStatus('error');
          stopUserStream();
        });
      }

      // The SDK expects the element id, not the element reference.
      await client.streamToVideoElement('anam-persona-video', stream);

      if (status !== 'connected') {
        // Fallback in case the ready event is delayed or unavailable
        setStatus('connected');
      }
    } catch (err) {
      console.error('Failed to start Anam chat:', err);
      setError(err.message || 'Failed to start Anam voice assistant.');
      setStatus('error');
      stopUserStream();
      teardownClient();
    }
  };

  const stopChat = async () => {
    try {
      await teardownClient();
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    } catch (err) {
      console.error('Error while stopping Anam chat:', err);
    } finally {
      stopUserStream();
      setStatus('idle');
      setError('');
    }
  };

  return (
    <section className="section anam-assistant">
      <h2 className="section__title">Aman&apos;s Voice Assistant</h2>
      <span className="section__subtitle">Talk to the AI persona in real time</span>

      <div className="anam-assistant__body">
        <div className="anam-assistant__video">
          <video
            id="anam-persona-video"
            ref={videoRef}
            autoPlay
            playsInline
            className="anam-assistant__video-element"
          />
        </div>

        <div className="anam-assistant__panel">
          <div className="anam-assistant__status">
            <span className={`anam-assistant__dot anam-assistant__dot--${status}`} />
            <div>
              <p className="anam-assistant__status-label">{statusCopy[status]}</p>
              <p className="anam-assistant__hint">
                Microphone access is requested when you start. Use Chrome/Safari with HTTPS for
                best results.
              </p>
            </div>
          </div>

          <div className="anam-assistant__actions">
            <button
              className="button anam-assistant__button"
              onClick={startChat}
              disabled={status === 'connecting' || status === 'connected'}
            >
              {status === 'connecting' ? 'Connecting...' : 'Start voice chat'}
            </button>
            <button
              className="button button--white anam-assistant__button"
              onClick={stopChat}
              disabled={status === 'idle' || status === 'connecting'}
            >
              Stop
            </button>
          </div>

          {permissionStatus === 'denied' && (
            <p className="anam-assistant__warning">
              Microphone permission was blocked. Please allow access and try again.
            </p>
          )}

          {error && <p className="anam-assistant__error">{error}</p>}
        </div>
      </div>
    </section>
  );
};

export default AnamVoiceAssistant;


