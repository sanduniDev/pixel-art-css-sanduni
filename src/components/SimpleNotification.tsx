import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import * as actionCreators from '../store/actions/actionCreators';

const SimpleNotification = ({
  duration,
  fadeInTime,
  fadeOutTime,
  notifications,
  actions
}) => {
  const removeNotification = id => {
    setTimeout(() => {
      actions.removeNotification(id);
    }, duration);
  };

  useEffect(() => {
    notifications.forEach(notification => {
      removeNotification(notification.id);
    });
  }, [notifications]);

  const timeout = { enter: fadeInTime, exit: fadeOutTime };

  const notificationList = notifications.map(item => (
    <CSSTransition
      key={item.id}
      timeout={timeout}
      classNames="simple-notification"
    >
      <div className="simple-notification" role="alert">
        {item.message}
      </div>
    </CSSTransition>
  ));

  return (
    <TransitionGroup>
      {notificationList}
    </TransitionGroup>
  );
};

const mapStateToProps = state => ({
  notifications: state.present.get('notifications')
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

const SimpleNotificationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SimpleNotification);

export default SimpleNotificationContainer;
