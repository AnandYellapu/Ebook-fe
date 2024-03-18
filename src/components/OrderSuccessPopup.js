
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Typography, Button, Fade } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const OrderSuccessPopup = ({
  open,
  handleClose,
  message = "Order Placed Successfully!",
  redirectUrl,
  autoCloseDuration,
  customStyles,
  animationType = 'fade',
  animationDuration = 300,
  customIcon
}) => {
  useEffect(() => {
    if (autoCloseDuration && open) {
      const timeoutId = setTimeout(handleClose, autoCloseDuration);
      return () => clearTimeout(timeoutId);
    }
  }, [open, autoCloseDuration, handleClose]);

  const renderIcon = customIcon ? customIcon : <CheckCircleIcon style={{ color: 'green', fontSize: 60, marginBottom: 2 }} />;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="order-success-popup"
      aria-describedby="order-success-message"
      BackdropProps={{
        sx: {
          transitionDuration: `${animationDuration}ms`
        }
      }}
    >
      <Fade in={open} timeout={animationDuration}>
        <div className={`order-success-popup-container ${animationType}`} style={customStyles}>
          <div className="order-success-popup-icon">
            {renderIcon}
          </div>
          <Typography variant="h5" gutterBottom className="order-success-popup-message">
            {message}
          </Typography>
          <Typography className="order-success-popup-info">Your order has been successfully placed.</Typography>
          {redirectUrl && (
            <Button variant="contained" color="primary" onClick={() => {
              handleClose();
              window.location.href = redirectUrl;
            }} className="order-success-popup-button">
              Go to {redirectUrl}
            </Button>
          )}
          <Button variant="contained" color="primary" onClick={handleClose} className="order-success-popup-button">
            Close
          </Button>
        </div>
      </Fade>
    </Modal>
  );
};

OrderSuccessPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  message: PropTypes.string,
  redirectUrl: PropTypes.string,
  autoCloseDuration: PropTypes.number,
  customStyles: PropTypes.object,
  animationType: PropTypes.oneOf(['fade', 'slide']),
  animationDuration: PropTypes.number,
  customIcon: PropTypes.element
};

export default OrderSuccessPopup;
