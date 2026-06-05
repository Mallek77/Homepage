import { createContext, useContext, useState, ReactNode } from "react";

export type Mission = {
  id: string;
  date: string;
  heure: string;
  machine: "Nissan 30m" | "Junior" | "37m Tractée";
  nomEntreprise: string;
  telephone: string;
  email: string;
  lieu: string;
  statutPaiement: "Payé" | "En attente" | "Annulé" | "";
  prix: string;
  remarque: string;
  statut: "active" | "pending" | "completed";
};

type MissionsContextType = {
  missions: Mission[];
  addMission: (m: Omit<Mission, "id" | "statut">) => void;
  updateMission: (m: Mission) => void;
  deleteMission: (id: string) => void;
};

const MissionsContext = createContext<MissionsContextType | null>(null);

const INITIAL: Mission[] = [
  {
    id: "M001",
    machine: "Junior",
    nomEntreprise: "",
    telephone: "0612647434",
    email: "",
    lieu: "63 AV Vallauris",
    date: "2026-06-05",
    heure: "9H",
    statutPaiement: "En attente",
    prix: "320",
    remarque: "",
    statut: "active",
  },
  {
    id: "M002",
    machine: "Nissan 30m",
    nomEntreprise: "Azur Levage",
    telephone: "",
    email: "",
    lieu: "Nice Centre",
    date: "2026-06-03",
    heure: "8H",
    statutPaiement: "En attente",
    prix: "450",
    remarque: "",
    statut: "pending",
  },
  {
    id: "M003",
    machine: "37m Tractée",
    nomEntreprise: "ProConstruct",
    telephone: "",
    email: "",
    lieu: "Cannes",
    date: "2026-06-04",
    heure: "10H",
    statutPaiement: "Payé",
    prix: "680",
    remarque: "",
    statut: "completed",
  },
  {
    id: "M004",
    machine: "Junior",
    nomEntreprise: "SkyBuild",
    telephone: "",
    email: "",
    lieu: "Antibes",
    date: "2026-06-06",
    heure: "14H",
    statutPaiement: "En attente",
    prix: "280",
    remarque: "",
    statut: "active",
  },
  {
    id: "M005",
    machine: "Nissan 30m",
    nomEntreprise: "TechLevage",
    telephone: "",
    email: "",
    lieu: "Monaco",
    date: "2026-06-07",
    heure: "9H",
    statutPaiement: "En attente",
    prix: "520",
    remarque: "",
    statut: "pending",
  },
];

export function MissionsProvider({ children }: { children: ReactNode }) {
  const [missions, setMissions] = useState<Mission[]>(INITIAL);

  const addMission = (m: Omit<Mission, "id" | "statut">) => {
    const newMission: Mission = {
      ...m,
      id: `M${String(Date.now()).slice(-4)}`,
      statut: m.statutPaiement === "Payé" ? "completed" : "active",
    };
    setMissions((prev) => [...prev, newMission]);
  };

  const updateMission = (updated: Mission) => {
    setMissions((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
  };

  const deleteMission = (id: string) => {
    setMissions((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <MissionsContext.Provider
      value={{ missions, addMission, updateMission, deleteMission }}
    >
      {children}
    </MissionsContext.Provider>
  );
}

export function useMissions() {
  const ctx = useContext(MissionsContext);
  if (!ctx) throw new Error("useMissions must be used inside MissionsProvider");
  return ctx;
}
