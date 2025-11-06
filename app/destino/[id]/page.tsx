import DestinoDetailContent from "./destino-detail-content"

type DestinoDetailPageProps = {
  params: Promise<{ id: string }>
}

export default async function DestinoDetailPage({ params }: DestinoDetailPageProps) {
  const { id } = await params
  return <DestinoDetailContent destinoId={id} />
}
