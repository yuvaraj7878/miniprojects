import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
  Box, 
  IconButton, 
  Paper, 
  Typography, 
  TextField, 
  InputAdornment, 
  Avatar, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText, 
  Divider,
  Slide,
  Fade,
  Badge
} from '@mui/material';
import { 
  Send as SendIcon,
  Close as CloseIcon,
  Chat as ChatIcon,
  SmartToy as BotIcon,
  Person as UserIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const ChatContainer = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  width: 350,
  maxHeight: 500,
  display: 'flex',
  flexDirection: 'column',
  boxShadow: theme.shadows[10],
  borderRadius: 12,
  overflow: 'hidden',
  zIndex: 1000,
}));

const ChatHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

const MessagesContainer = styled(List)(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
}));

const UserMessage = styled(ListItem)(({ theme }) => ({
  justifyContent: 'flex-end',
  '& .MuiListItemText-root': {
    textAlign: 'right',
  },
}));

const BotMessage = styled(ListItem)(({ theme }) => ({
  justifyContent: 'flex-start',
}));

const MessageBubble = styled(Paper)(({ theme, sender }) => ({
  padding: theme.spacing(1.5, 2),
  maxWidth: '80%',
  wordWrap: 'break-word',
  backgroundColor: sender === 'bot' 
    ? theme.palette.grey[100] 
    : theme.palette.primary.main,
  color: sender === 'bot' 
    ? theme.palette.text.primary 
    : theme.palette.primary.contrastText,
  borderRadius: sender === 'bot' 
    ? '18px 18px 18px 4px' 
    : '18px 18px 4px 18px',
}));

const ChatInput = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const ToggleButton = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      text: 'Hello! I am your license management assistant. How can I help you today?', 
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const newMessage = { 
      text: inputValue, 
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    
    // Bot response
    setTimeout(() => {
      const botResponses = [
        "I can help you with license applications, renewals, and status checks.",
        "You can upload documents through the 'Apply for License' section in your dashboard.",
        "Approval usually takes 3-5 business days after document submission.",
        "For rejected applications, you'll receive detailed feedback and can reapply with corrections.",
        "You can check your application status anytime in the dashboard under 'My Applications'.",
        "License renewals can be initiated 30 days before expiration. I can help you with that process.",
        "All submitted documents are encrypted and stored securely in compliance with government regulations."
      ];
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      setMessages(prev => [...prev, { 
        text: randomResponse, 
        sender: 'bot',
        timestamp: new Date()
      }]);
    }, 800);

    setInputValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestedQuestions = [
    "How do I apply for a new license?",
    "What documents are required?",
    "How long does approval take?",
    "My application was rejected, what should I do?"
  ];

  return (
    <>
      <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
        <ChatContainer elevation={6}>
          <ChatHeader>
            <Box display="flex" alignItems="center">
              <BotIcon sx={{ mr: 1 }} />
              <Typography variant="h6">License Assistant</Typography>
            </Box>
            <IconButton 
              size="small" 
              color="inherit"
              onClick={() => setIsOpen(false)}
            >
              <CloseIcon />
            </IconButton>
          </ChatHeader>

          <MessagesContainer>
            {messages.map((msg, index) => (
              <React.Fragment key={index}>
                {msg.sender === 'user' ? (
                  <UserMessage>
                    <ListItemText
                      primary={
                        <MessageBubble sender="user">
                          <Typography variant="body1">{msg.text}</Typography>
                        </MessageBubble>
                      }
                      secondary={
                        <Typography 
                          variant="caption" 
                          color="textSecondary"
                          sx={{ mt: 0.5, display: 'block' }}
                        >
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </Typography>
                      }
                    />
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        <UserIcon />
                      </Avatar>
                    </ListItemAvatar>
                  </UserMessage>
                ) : (
                  <BotMessage>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'grey.500' }}>
                        <BotIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <MessageBubble sender="bot">
                          <Typography variant="body1">{msg.text}</Typography>
                        </MessageBubble>
                      }
                      secondary={
                        <Typography 
                          variant="caption" 
                          color="textSecondary"
                          sx={{ mt: 0.5, display: 'block' }}
                        >
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </Typography>
                      }
                    />
                  </BotMessage>
                )}
                <Divider variant="inset" component="li" sx={{ my: 1 }} />
              </React.Fragment>
            ))}
            <div ref={messagesEndRef} />
          </MessagesContainer>

          {messages.length === 1 && (
            <Box sx={{ p: 2, bgcolor: 'background.default' }}>
              <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                Quick questions you can ask:
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {suggestedQuestions.map((question, i) => (
                  <Fade in timeout={(i + 1) * 300} key={i}>
                    <Paper 
                      elevation={0}
                      sx={{
                        p: 1,
                        borderRadius: 2,
                        bgcolor: 'grey.100',
                        cursor: 'pointer',
                        '&:hover': {
                          bgcolor: 'grey.200',
                        }
                      }}
                      onClick={() => setInputValue(question)}
                    >
                      <Typography variant="body2">{question}</Typography>
                    </Paper>
                  </Fade>
                ))}
              </Box>
            </Box>
          )}

          <ChatInput>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Type your question..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton 
                      edge="end" 
                      color="primary"
                      onClick={handleSend}
                      disabled={!inputValue.trim()}
                    >
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </ChatInput>
        </ChatContainer>
      </Slide>

      <ToggleButton 
        color="primary"
        onClick={() => setIsOpen(!isOpen)}
        size="large"
      >
        <Badge 
          color="error" 
          variant="dot" 
          invisible={messages.length <= 1 || isOpen}
        >
          <ChatIcon fontSize="large" />
        </Badge>
      </ToggleButton>
    </>
  );
}

export default ChatBot;