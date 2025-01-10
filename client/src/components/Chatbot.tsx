import React, { useState } from 'react';
import { Box, IconButton, TextField, Typography, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MinimizeIcon from '@mui/icons-material/Minimize';
import SendIcon from '@mui/icons-material/Send';
import AssistantIcon from '@mui/icons-material/Assistant';
import Draggable from 'react-draggable';
import useChat from '../hooks/useChat';

interface ChatbotProps {
  onClose: () => void;
  title: string;
  headerColor: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ onClose, title, headerColor }) => {
  const { threadId, loading } = useChat();
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [minimized, setMinimized] = useState(false);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput('');
    }
  };

  const toggleMinimize = () => {
    setMinimized(!minimized);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Draggable handle=".chatbot-header">
      <Paper
        elevation={3}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          width: 300,
          height: minimized ? 50 : 600,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          transition: 'height 0.3s',
        }}
      >
        <Box
          className="chatbot-header"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 1,
            backgroundColor: headerColor,
            color: 'white',
            cursor: 'move',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AssistantIcon style={{ marginRight: 8 }} />
            <Typography variant="h6">{title}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton size="small" onClick={toggleMinimize}>
              <MinimizeIcon style={{ color: 'white' }} />
            </IconButton>
            <IconButton size="small" onClick={onClose}>
              <CloseIcon style={{ color: 'white' }} />
            </IconButton>
          </Box>
        </Box>
        {!minimized && (
          <>
            <Box sx={{ flexGrow: 1, p: 1, overflowY: 'auto' }}>
              {threadId && <Typography>Thread ID: {threadId}</Typography>}
              {messages.map((msg, index) => (
                <Typography key={index} variant="body1" sx={{ mb: 1 }}>
                  {msg}
                </Typography>
              ))}
            </Box>
            <Box sx={{ display: 'flex', p: 1, borderTop: '1px solid #ccc' }}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSend();
                  }
                }}
              />
              <IconButton size="small" onClick={handleSend} disabled={!input.trim()}>
                <SendIcon />
              </IconButton>
            </Box>
          </>
        )}
      </Paper>
    </Draggable>
  );
};

export default Chatbot;