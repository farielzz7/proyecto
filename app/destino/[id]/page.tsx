import DestinoDetailContent from "./destino-detail-content"

type DestinoDetailPageProps = {
  params: { id: string }
}

export default function DestinoDetailPage({ params }: DestinoDetailPageProps) {
  return <DestinoDetailContent destinoId={params.id} />
}
