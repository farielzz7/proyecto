"use client";

import { Compass, CreditCard, MapPin, User } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TravelDestinationCard } from "@/components/travel-destination-card";

export default function DashboardPage() {
  const [profile, setProfile] = useState<ProfilePayload | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [errorProfile, setErrorProfile] = useState<string | null>(null);

  const loadProfile = useCallback(
    async (signal?: AbortSignal) => {
      if (signal?.aborted) return;

      setLoadingProfile(true);
      setErrorProfile(null);

      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

        if (!token) {
          if (signal?.aborted) return;
          setErrorProfile("Inicia sesión para consultar tu perfil");
          setProfile(null);
          return;
        }

        const res = await fetch("https://uni-djzy.onrender.com/api/me", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          signal,
        });

        if (signal?.aborted) return;

        const data = await res.json();

        if (signal?.aborted) return;

        if (!res.ok || !data.success) {
          setErrorProfile(data.message || "No se pudo obtener el perfil");
          setProfile(null);
          return;
        }

        setProfile(data.data.user as ProfilePayload);
      } catch (error) {
        if (signal?.aborted) {
          return;
        }

        console.error("Error fetching profile:", error);
        setErrorProfile("No pudimos conectar con el servidor. Inténtalo nuevamente más tarde.");
        setProfile(null);
      } finally {
        if (signal?.aborted) return;
        setLoadingProfile(false);
      }
    },
    []
  );

  useEffect(() => {
    const controller = new AbortController();

    void loadProfile(controller.signal);

    return () => {
      controller.abort();
    };
  }, [loadProfile]);

  const refreshProfile = useCallback(() => {
    void loadProfile();
  }, [loadProfile]);

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
                <CardDescription>
                  Gestiona tu información personal y preferencias para recibir recomendaciones personalizadas.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loadingProfile ? (
                  <ProfileSkeleton />
                ) : errorProfile ? (
                  <ProfileError message={errorProfile} onRetry={refreshProfile} />
                ) : profile ? (
                  <ProfileDetails profile={profile} onRefresh={refreshProfile} />
                ) : (
                  <ProfileEmptyState onRetry={refreshProfile} />
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

type ProfilePayload = {
  email?: string | null;
  created_at?: string | null;
  turista?: {
    nombre?: string | null;
    apellido?: string | null;
    nacionalidad?: string | null;
    edad?: number | null;
    telefono?: string | null;
    preferencia_viaje?: string | null;
    preferencias?: string[] | null;
    intereses?: string[] | null;
    idiomas?: string[] | null;
    meta?: string | null;
    proximo_viaje?: string | null;
    avatarUrl?: string | null;
    avatar_url?: string | null;
  } | null;
};

function ProfileDetails({ profile, onRefresh }: { profile: ProfilePayload; onRefresh: () => void }) {
  const turista = profile.turista ?? {};
  const fullName = useMemo(() => {
    const parts = [turista.nombre, turista.apellido].filter(Boolean) as string[];
    if (parts.length) {
      return parts.join(" ");
    }
    return profile.email ?? "Viajero sin nombre";
  }, [profile.email, turista.apellido, turista.nombre]);

  const membership = useMemo(() => formatMemberSince(profile.created_at), [profile.created_at]);

  const primaryPreference = useMemo(() => {
    if (turista.preferencia_viaje && turista.preferencia_viaje.trim().length > 0) {
      return turista.preferencia_viaje;
    }

    if (Array.isArray(turista.preferencias) && turista.preferencias.length > 0) {
      return turista.preferencias[0];
    }

    if (Array.isArray(turista.intereses) && turista.intereses.length > 0) {
      return turista.intereses[0];
    }

    return "Define tus preferencias para personalizar recomendaciones";
  }, [turista.intereses, turista.preferencia_viaje, turista.preferencias]);

  const preferenceTags = useMemo(() => {
    if (Array.isArray(turista.preferencias) && turista.preferencias.length > 0) {
      return turista.preferencias.filter(Boolean) as string[];
    }

    if (Array.isArray(turista.intereses) && turista.intereses.length > 0) {
      return turista.intereses.filter(Boolean) as string[];
    }

    if (turista.preferencia_viaje) {
      return [turista.preferencia_viaje];
    }

    return [];
  }, [turista.intereses, turista.preferencia_viaje, turista.preferencias]);

  const languages = useMemo(() => {
    if (Array.isArray(turista.idiomas) && turista.idiomas.length > 0) {
      return turista.idiomas.filter(Boolean) as string[];
    }

    return [];
  }, [turista.idiomas]);

  const avatar = turista.avatarUrl ?? turista.avatar_url ?? "/placeholder-user.jpg";
  const upcomingTrip = turista.proximo_viaje ?? "Registra tu próximo viaje para hacerle seguimiento";
  const travelGoal = turista.meta ?? "Define una meta anual para mantenerte motivado";

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-teal-600 via-teal-700 to-teal-800 p-6 text-white shadow-lg">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <Image
            src={avatar}
            alt={`Avatar de ${fullName}`}
            width={120}
            height={120}
            className="h-24 w-24 rounded-full border-4 border-white/40 object-cover shadow-md"
          />
          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-2xl font-semibold leading-tight">{fullName}</h3>
              {membership ? (
                <Badge variant="secondary" className="bg-white/20 text-white">
                  Miembro desde {membership}
                </Badge>
              ) : null}
            </div>
            <p className="text-white/80">{profile.email ?? "Añade un correo electrónico"}</p>
            <p className="text-sm text-white/80">{primaryPreference}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="bg-white text-teal-900 hover:bg-white/90"
                onClick={() => console.log("Abrir modal de edición de perfil")}
              >
                Editar perfil
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="border-white/40 text-white hover:bg-white/10"
                onClick={onRefresh}
              >
                Actualizar datos
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-foreground">Datos de contacto</h4>
            <Badge variant="outline" className="border-amber-300 text-amber-600">
              Privado
            </Badge>
          </div>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex items-start justify-between gap-4">
              <dt className="text-muted-foreground">Nombre</dt>
              <dd className="font-medium text-right">{turista.nombre ?? "Sin registrar"}</dd>
            </div>
            <div className="flex items-start justify-between gap-4">
              <dt className="text-muted-foreground">Apellido</dt>
              <dd className="font-medium text-right">{turista.apellido ?? "Sin registrar"}</dd>
            </div>
            <div className="flex items-start justify-between gap-4">
              <dt className="text-muted-foreground">Nacionalidad</dt>
              <dd className="font-medium text-right">{turista.nacionalidad ?? "Añade tu nacionalidad"}</dd>
            </div>
            <div className="flex items-start justify-between gap-4">
              <dt className="text-muted-foreground">Edad</dt>
              <dd className="font-medium text-right">{turista.edad ? `${turista.edad} años` : "Completa tu edad"}</dd>
            </div>
            <div className="flex items-start justify-between gap-4">
              <dt className="text-muted-foreground">Teléfono</dt>
              <dd className="font-medium text-right">{turista.telefono ?? "Agrega un número de contacto"}</dd>
            </div>
            <div className="flex items-start justify-between gap-4">
              <dt className="text-muted-foreground">Correo</dt>
              <dd className="font-medium text-right">{profile.email ?? "Sin correo"}</dd>
            </div>
          </dl>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() => console.log("Actualizar datos")}
          >
            Gestionar datos personales
          </Button>
        </section>

        <section className="rounded-xl border bg-card p-6 shadow-sm">
          <h4 className="text-lg font-semibold text-foreground">Preferencias de viaje</h4>
          <p className="mt-1 text-sm text-muted-foreground">
            Personaliza tus intereses para recibir alertas y recomendaciones acordes a tu estilo de viaje.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {preferenceTags.length > 0 ? (
              preferenceTags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-teal-100 text-teal-800">
                  {tag}
                </Badge>
              ))
            ) : (
              <span className="text-sm text-muted-foreground">Aún no has configurado tus preferencias.</span>
            )}
          </div>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-start justify-between gap-4">
              <span className="text-muted-foreground">Idiomas</span>
              <span className="font-medium text-right">
                {languages.length > 0 ? languages.join(", ") : "Añade los idiomas que dominas"}
              </span>
            </div>
            <div className="flex items-start justify-between gap-4">
              <span className="text-muted-foreground">Meta anual</span>
              <span className="font-medium text-right">{travelGoal}</span>
            </div>
          </div>
          <Button
            type="button"
            size="sm"
            className="mt-4 bg-teal-700 hover:bg-teal-800"
            onClick={() => console.log("Abrir configurador de preferencias")}
          >
            Ajustar preferencias
          </Button>
        </section>

        <section className="rounded-xl border bg-card p-6 shadow-sm md:col-span-2">
          <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
            <div>
              <h4 className="text-lg font-semibold text-foreground">Actividad reciente</h4>
              <p className="text-sm text-muted-foreground">Mantén tus próximos viajes y objetivos siempre actualizados.</p>
            </div>
            <Badge variant="secondary" className="bg-teal-100 text-teal-800">
              Explorador activo
            </Badge>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-muted/30 p-4">
              <p className="text-sm font-medium text-muted-foreground">Próximo viaje</p>
              <p className="mt-1 text-base font-semibold text-foreground">{upcomingTrip}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Añade fechas y presupuesto para recibir recordatorios antes de viajar.
              </p>
            </div>
            <div className="rounded-lg bg-muted/30 p-4">
              <p className="text-sm font-medium text-muted-foreground">Consejo personalizado</p>
              <p className="mt-1 text-base font-semibold text-foreground">
                {preferenceTags.length > 0
                  ? `Explora nuevas experiencias de ${preferenceTags[0].toLowerCase()}.`
                  : "Configura tus preferencias para desbloquear recomendaciones"}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Guarda al menos tres destinos en tu lista de deseos para mejorar tus sugerencias.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-teal-600 via-teal-700 to-teal-800 p-6 shadow-lg">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <Skeleton className="h-24 w-24 rounded-full bg-white/30" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-6 w-1/3 bg-white/40" />
            <Skeleton className="h-4 w-1/2 bg-white/30" />
            <Skeleton className="h-4 w-2/5 bg-white/20" />
            <div className="flex gap-3">
              <Skeleton className="h-9 w-28 bg-white/30" />
              <Skeleton className="h-9 w-36 bg-white/20" />
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {[0, 1, 2].map((item) => (
          <div key={item} className={`rounded-xl border bg-card p-6 shadow-sm ${item === 2 ? "md:col-span-2" : ""}`}>
            <Skeleton className="h-5 w-40" />
            <Skeleton className="mt-4 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-3/4" />
            <Skeleton className="mt-2 h-4 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileError({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-destructive/40 bg-destructive/5 p-10 text-center">
      <p className="text-base font-semibold text-destructive">No pudimos cargar tu perfil</p>
      <p className="text-sm text-muted-foreground">{message}</p>
      <Button type="button" variant="outline" onClick={onRetry}>
        Reintentar
      </Button>
    </div>
  );
}

function ProfileEmptyState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border bg-muted/20 p-10 text-center">
      <p className="text-base font-semibold text-foreground">Completa tu perfil para personalizar tu experiencia</p>
      <p className="text-sm text-muted-foreground">
        Añade tus datos personales, preferencias y destinos soñados para recibir sugerencias más relevantes.
      </p>
      <Button type="button" onClick={onRetry}>
        Actualizar perfil
      </Button>
    </div>
  );
}

function formatMemberSince(value?: string | null) {
  if (!value) return null;
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat("es-MX", { month: "long", year: "numeric" }).format(date);
}
