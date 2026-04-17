import { Card, CardBody, CardEyebrow, CardTitle } from "./card";

type LegalCardProps = {
  label: string;
  title: string;
  copy: string;
};

export function LegalCard({ label, title, copy }: LegalCardProps) {
  return (
    <Card tone="default" accent>
      <CardEyebrow>{label}</CardEyebrow>
      <CardTitle size="sm">{title}</CardTitle>
      <CardBody>{copy}</CardBody>
    </Card>
  );
}
