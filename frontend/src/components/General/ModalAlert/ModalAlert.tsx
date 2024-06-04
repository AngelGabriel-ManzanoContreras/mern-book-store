import { ModalAlertProps } from "./ModalAlert.interface"
import useModalAlertLogic from "./ModalAlert.logic";

import styles from './ModalAlert.module.css';

export default function ModalAlert({ active, title, message, children } : ModalAlertProps) {
  useModalAlertLogic(active);
  const ModalOverlayStyle = `${ styles[`modal-alert__overlay`] } ${ 
    active ? styles[`modal-alert__overlay--active`] : ''}`;
  const ModalAlertStyle = `${ styles[`modal-alert`] } ${ active ? styles[`modal-alert--active`] : ''}`;
  /*
   * children must be buttons or links along with their event handlers
   */

  return (
    <div className={ ModalOverlayStyle }>
      <section className={ ModalAlertStyle }>

        <section className={ styles[`modal-alert__content`] }>
          <h1 className={ styles[`modal-alert__title`] }>{ title }</h1>
          <p className={ styles[`modal-alert__message`] }>{ message }</p>
        </section>

        <section className={ styles[`modal-alert__actions`] }>
          { children }
        </section>

      </section>
    </div>
  )
}
