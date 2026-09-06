import { Modal } from "@/src/components/Modal/Modal";
import { RequestForm } from "@/src/components/RequestForm/RequestForm";

export default function RequestModal() {
  return (
    <Modal>
      <RequestForm
        title="Оставить заявку"
        buttonText="Отправить заявку"
      />
    </Modal>
  );
}
