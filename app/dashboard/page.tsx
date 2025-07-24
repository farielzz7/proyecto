import { Compass, CreditCard, MapPin, User } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TravelDestinationCard } from "@/components/travel-destination-card"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Button>Nuevo Viaje</Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="trips">Mis Viajes</TabsTrigger>
            <TabsTrigger value="saved">Guardados</TabsTrigger>
            <TabsTrigger value="budget">Presupuesto</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Viajes Completados</CardTitle>
                  <Compass className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4</div>
                  <p className="text-xs text-muted-foreground">+2 desde el año pasado</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Viajes Planeados</CardTitle>
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-xs text-muted-foreground">Próximos 6 meses</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Presupuesto Anual</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$5,240</div>
                  <p className="text-xs text-muted-foreground">$2,800 gastados</p>
                  <Progress value={53} className="mt-2" />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Destinos Guardados</CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">+3 este mes</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Próximo Viaje</CardTitle>
                  <CardDescription>Chichén Itzá - 15 de Junio, 2025</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="relative h-[200px] w-full overflow-hidden rounded-xl">
                    <Image
                      src="/placeholder.svg?height=400&width=800"
                      alt="Chichén Itzá"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white">Chichén Itzá, México</h3>
                      <p className="text-white/80">5 días, 4 noches</p>
                      <div className="mt-2 flex gap-2">
                        <Button size="sm" variant="secondary">
                          Ver detalles
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-white/20 text-white border-white/40 hover:bg-white/30"
                        >
                          Modificar
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Distribución de Gastos</CardTitle>
                  <CardDescription>Desglose de tu último viaje</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-1/2">
                        <div className="text-sm font-medium">Hospedaje</div>
                        <div className="text-xs text-muted-foreground">$850</div>
                      </div>
                      <div className="w-1/2">
                        <Progress value={42} className="h-2" />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-1/2">
                        <div className="text-sm font-medium">Transporte</div>
                        <div className="text-xs text-muted-foreground">$450</div>
                      </div>
                      <div className="w-1/2">
                        <Progress value={22} className="h-2" />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-1/2">
                        <div className="text-sm font-medium">Comida</div>
                        <div className="text-xs text-muted-foreground">$380</div>
                      </div>
                      <div className="w-1/2">
                        <Progress value={19} className="h-2" />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-1/2">
                        <div className="text-sm font-medium">Actividades</div>
                        <div className="text-xs text-muted-foreground">$320</div>
                      </div>
                      <div className="w-1/2">
                        <Progress value={16} className="h-2" />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-1/2">
                        <div className="text-sm font-medium">Otros</div>
                        <div className="text-xs text-muted-foreground">$20</div>
                      </div>
                      <div className="w-1/2">
                        <Progress value={1} className="h-2" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Recomendaciones para ti</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <TravelDestinationCard
                  title="Tulum"
                  location="Quintana Roo, México"
                  price={950}
                  image="/placeholder.svg?height=400&width=600"
                  rating={4.6}
                  id="tulum"
                />
                <TravelDestinationCard
                  title="Tikal"
                  location="Petén, Guatemala"
                  price={1050}
                  image="/placeholder.svg?height=400&width=600"
                  rating={4.7}
                  id="tikal"
                />
                <TravelDestinationCard
                  title="Copán"
                  location="Copán, Honduras"
                  price={850}
                  image="/placeholder.svg?height=400&width=600"
                  rating={4.5}
                  id="copán"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

