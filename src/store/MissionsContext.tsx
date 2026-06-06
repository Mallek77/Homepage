import { createContext, useContext, useState, useEffect, ReactNode } from "react";

const API_URL = "https://script.google.com/macros/s/AKfycbyqxkK7jtGi52WZ4klbxnHskmvIrDH5-AwkA_pCemQ7SHSCeZtF5IVYn2dXpxLdgGOe/exec";

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
  loading: boolean;
  addMission: (m: Omit<Mission, "id" | "statut">) => Promise<void>;
  updateMission: (m: Mission) => Promise<void>;
  deleteMission: (id: string) => Promise<void>;
};

const MissionsContext = createContext<MissionsContextType | null>(null);

export function MissionsProvider({ children }: { children: ReactNode }) {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((r) => r.json())
      .then((data: Mission[]) => {
        setMissions(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const addMission = async (m: Omit<Mission, "id" | "statut">) => {
    const newMission: Mission = {
      ...m,
      id: `M${String(Date.now()).slice(-4)}`,
      statut: m.statutPaiement === "Payé" ? "completed" : "active",
    };
    setMissions((prev) => [...prev, newMission]);
    await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({ action: "add", ...newMission }),
    });
  };

  const updateMission = async (updated: Mission) => {
    setMissions((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
    await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({ action: "update", ...updated }),
    });
  };

  const deleteMission = async (id: string) => {
    setMissions((prev) => prev.filter((m) => m.id !== id));
    await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({ action: "delete", id }),
    });
  };

  return (
    <MissionsContext.Provider value={{ missions, loading, addMission, updateMission, deleteMission }}>
      {children}
    </MissionsContext.Provider>
  );
}

export function useMissions() {
  const ctx = useContext(MissionsContext);
  if (!ctx) throw new Error("useMissions must be used inside MissionsProvider");
  return ctx;
}
