import React, { KeyboardEvent, PureComponent } from 'react';
import { createPortal } from 'react-dom';
import cn from 'clsx';

// Resources / Styles
import './Modal.scss';

const ESC_KEY = 27;

const body = document.querySelector('body') as HTMLBodyElement;
let modalRoot = document.querySelector('#modal');

if (!modalRoot) {
  modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'modal');
  body.appendChild(modalRoot);
}

type Position = {
  top: string;
  left: string;
};

type Props = {
  isOpen?: boolean;
  positioning?: Position;
  onClose?: (e?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  shouldCloseOnOverlayClick?: boolean;
  shouldCloseOnEsc?: boolean;
  hideCloseButton?: boolean;
  scrollable?: boolean;
  fullscreen?: boolean;
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
};

export class Modal extends PureComponent<Props> {
  static defaultProps: Props = {
    isOpen: true,
    positioning: { top: '0', left: '0' },
    shouldCloseOnOverlayClick: true,
    shouldCloseOnEsc: true,
    children: 'Modal component',
    scrollable: false,
    fullscreen: false,
    onClose: () => {},
    className: '',
    containerClassName: '',
  };

  componentDidMount() {
    body.classList.add('hasModal');
  }

  componentWillUnmount() {
    body.classList.remove('hasModal');
  }

  handleKeyDown = (event: KeyboardEvent) => {
    if (this.props.shouldCloseOnEsc && event.keyCode === ESC_KEY) {
      event.stopPropagation();
      if (this.props.onClose) {
        this.props.onClose();
      }
    }
  };

  handleOverlayOnClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if ((event.target as HTMLDivElement).classList.contains('overlay') && this.props.shouldCloseOnOverlayClick) {
      if (this.props.onClose) {
        this.props.onClose();
      }
      event.preventDefault();
      event.stopPropagation();
    }
  };

  renderModal() {
    const {
      isOpen,
      positioning,
      scrollable,
      fullscreen,
      children,
      onClose = () => {},
      className,
      containerClassName,
      hideCloseButton,
    } = this.props;

    return (
      <div
        className={cn('modalOverlay', { open: isOpen }, className)}
        onKeyDown={this.handleKeyDown}
        onClick={this.handleOverlayOnClick}>
        {isOpen && (
          <div className="modalScroll">
            <div
              className={cn(
                'modalContainer shadow-xl bg-warmGray-100 text-gray-900',
                { scrollable, fullscreen },
                containerClassName
              )}
              style={positioning}
              role="dialog">
              {!hideCloseButton && (
                <button className="modalCloseBtn" onClick={onClose}>
                  close
                </button>
              )}
              {children}
            </div>
          </div>
        )}
      </div>
    );
  }

  render() {
    return createPortal(this.renderModal(), modalRoot as Element);
  }
}
