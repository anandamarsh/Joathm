import { useState, useEffect } from 'react';

const useChat = () => {
  const [threadId, setThreadId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchThreadId = async () => {
      const storedThreadId = localStorage.getItem('course-assistant-thread-id');
      if (storedThreadId) {
        setThreadId(storedThreadId);
        console.log('Thread ID found:', storedThreadId);
      } else {
        try {
          const response = await fetch('http://localhost:4000/create-thread', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json();
          const newThreadId = data.threadId;
          localStorage.setItem('course-assistant-thread-id', newThreadId);
          setThreadId(newThreadId);
        } catch (error) {
          console.error('Error fetching thread ID:', error);
        }
      }
      setLoading(false);
    };

    fetchThreadId();
  }, []);

  return { threadId, loading };
};

export default useChat;