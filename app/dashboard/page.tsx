"use client";

import { Compass, CreditCard, MapPin, User } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TravelDestinationCard } from "@/components/travel-destination-card";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [profile, setProfile] = useState<any>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [errorProfile, setErrorProfile] = useState<string | null>(null);

  console.log('Current profile state:', { profile, loadingProfile, errorProfile });

  useEffect(() => {
    const fetchProfile = async () => {
      setLoadingProfile(true);
      setErrorProfile(null);
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        console.log('Token encontrado:', token ? 'Sí' : 'No');
        
        if (!token) {
          setErrorProfile('No hay token de autenticación');
          setLoadingProfile(false);
          return;
        }

        const res = await fetch('https://uni-djzy.onrender.com/api/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
        
        console.log('Response status:', res.status);
        const data = await res.json();
        console.log('Response data:', data);
        
        if (data.success) {
          setProfile(data.data.user);
          console.log('Profile set:', data.data.user);
        } else {
          setErrorProfile(data.message || 'No se pudo obtener el perfil');
        }
      } catch (e) {
        console.error('Error fetching profile:', e);
        setErrorProfile('Error de red o servidor');
      } finally {
        setLoadingProfile(false);
      }
    };
    fetchProfile();
  }, []);

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
            <TabsTrigger value="profile">Perfil</TabsTrigger>
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
                    {[
                      { label: 'Hospedaje', value: 42, amount: '$850' },
                      { label: 'Transporte', value: 22, amount: '$450' },
                      { label: 'Comida', value: 19, amount: '$380' },
                      { label: 'Actividades', value: 16, amount: '$320' },
                      { label: 'Otros', value: 1, amount: '$20' },
                    ].map((item) => (
                      <div className="flex items-center" key={item.label}>
                        <div className="w-1/2">
                          <div className="text-sm font-medium">{item.label}</div>
                          <div className="text-xs text-muted-foreground">{item.amount}</div>
                        </div>
                        <div className="w-1/2">
                          <Progress value={item.value} className="h-2" />
                        </div>
                      </div>
                    ))}
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
          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Perfil del Turista</CardTitle>
                <CardDescription>Información personal del usuario</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingProfile ? (
                  <div className="text-center py-8">Cargando perfil...</div>
                ) : errorProfile ? (
                  <div className="text-center text-red-600 py-8">
                    <p>{errorProfile}</p>
                    <p className="text-sm mt-2">Debug: loading={loadingProfile.toString()}, profile={profile ? 'exists' : 'null'}</p>
                  </div>
                ) : profile ? (
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <Image
                      src="/placeholder-user.jpg"
                      alt="Foto de perfil"
                      width={120}
                      height={120}
                      className="rounded-full border"
                    />
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-semibold">Nombre:</p>
                        <p>{profile.turista?.nombre || '-'}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Apellido:</p>
                        <p>{profile.turista?.apellido || '-'}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Nacionalidad:</p>
                        <p>{profile.turista?.nacionalidad || '-'}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Edad:</p>
                        <p>{profile.turista?.edad || '-'}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Teléfono:</p>
                        <p>{profile.turista?.telefono || '-'}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Email:</p>
                        <p>{profile.email || '-'}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p>No se encontró información de perfil.</p>
                    <p className="text-sm mt-2">Debug: loading={loadingProfile.toString()}, error={errorProfile || 'none'}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
