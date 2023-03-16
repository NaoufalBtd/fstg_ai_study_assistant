import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { Box, Container } from '@mui/joy';
import { SxProps } from '@mui/joy/styles/types';
interface QuoteProps {
  quote: string;
  author: string;
}
const Quote: React.FC<QuoteProps> = ({ quote, author }) => {
  const quoteContainerStyle: SxProps = {
    display: 'flex',
    alignItems: 'center',
    margin: '20px 0',
    padding: '20px',
    borderRadius: '10px',
  };

  const quoteIconStyle = {
    marginRight: '10px',
    fontSize: '36px',
    color: '#007bff',
  };

  const quoteTextStyle: SxProps = {
    fontSize: { xs: '1.5rem', md: '2.4rem' },
    lineHeight: '1.4',
    marginBottom: '10px',
    textAlign: 'center',
  };

  const quoteAuthorStyle = {
    fontSize: '14px',
    fontWeight: 'bold',
    textAlign: 'right',
    fontStyle: 'italic',
  };

  return (
    <Container maxWidth="md" sx={quoteContainerStyle}>
      <div style={quoteIconStyle}>
        <FormatQuoteIcon
          sx={{ fontSize: { xs: '2rem', md: '3rem' }, color: '#485563' }}
        />
      </div>
      <Box sx={quoteTextStyle}>
        <p>{quote}</p>
        <p style={quoteAuthorStyle}>{author}</p>
      </Box>
    </Container>
  );
};

export default Quote;
