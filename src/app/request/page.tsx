import { RequestForm } from "@/src/components/RequestForm/RequestForm"

export default function RequestPage() {
  return (
    <main>
      <RequestForm
        title="Оставить заявку"
        buttonText="Отправить заявку"
      />
    </main>
  );
}