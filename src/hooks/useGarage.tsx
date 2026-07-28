"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { GarageBike, Product } from "@/types";

interface GarageContextType {
  activeBike: GarageBike | null;
  savedBikes: GarageBike[];
  setActiveBike: (bike: GarageBike | null) => void;
  addBikeToGarage: (bike: GarageBike) => void;
  removeBikeFromGarage: (slug: string) => void;
  checkCompatibility: (product: Product) => { isCompatible: boolean; message: string };
  isGarageOpen: boolean;
  setIsGarageOpen: (open: boolean) => void;
}

const GarageContext = createContext<GarageContextType | undefined>(undefined);

const STORAGE_KEY_ACTIVE = "agstar_active_garage_bike";
const STORAGE_KEY_SAVED = "agstar_saved_garage_bikes";

export function GarageProvider({ children }: { children: ReactNode }) {
  const [activeBike, setActiveBikeState] = useState<GarageBike | null>(null);
  const [savedBikes, setSavedBikes] = useState<GarageBike[]>([]);
  const [isGarageOpen, setIsGarageOpen] = useState(false);

  useEffect(() => {
    try {
      const storedActive = localStorage.getItem(STORAGE_KEY_ACTIVE);
      const storedSaved = localStorage.getItem(STORAGE_KEY_SAVED);

      if (storedActive) setActiveBikeState(JSON.parse(storedActive));
      if (storedSaved) setSavedBikes(JSON.parse(storedSaved));
    } catch (e) {
      console.error("Failed to load garage from localStorage", e);
    }
  }, []);

  const setActiveBike = (bike: GarageBike | null) => {
    setActiveBikeState(bike);
    if (bike) {
      localStorage.setItem(STORAGE_KEY_ACTIVE, JSON.stringify(bike));
    } else {
      localStorage.removeItem(STORAGE_KEY_ACTIVE);
    }
  };

  const addBikeToGarage = (bike: GarageBike) => {
    const exists = savedBikes.some((b) => b.slug === bike.slug);
    const updated = exists ? savedBikes : [...savedBikes, bike];
    setSavedBikes(updated);
    localStorage.setItem(STORAGE_KEY_SAVED, JSON.stringify(updated));
    setActiveBike(bike);
  };

  const removeBikeFromGarage = (slug: string) => {
    const updated = savedBikes.filter((b) => b.slug !== slug);
    setSavedBikes(updated);
    localStorage.setItem(STORAGE_KEY_SAVED, JSON.stringify(updated));
    if (activeBike?.slug === slug) {
      setActiveBike(updated.length > 0 ? updated[0] : null);
    }
  };

  const checkCompatibility = (product: Product) => {
    if (!activeBike) {
      return {
        isCompatible: true,
        message: "Select a bike in My Garage to verify exact fitment",
      };
    }

    const isMatch = product.compatibleBikes.some(
      (slug) => slug.toLowerCase() === activeBike.slug.toLowerCase()
    );

    if (isMatch) {
      return {
        isCompatible: true,
        message: `100% Guaranteed Fit for ${activeBike.brand} ${activeBike.model}`,
      };
    } else {
      return {
        isCompatible: false,
        message: `Does NOT fit ${activeBike.brand} ${activeBike.model}`,
      };
    }
  };

  return (
    <GarageContext.Provider
      value={{
        activeBike,
        savedBikes,
        setActiveBike,
        addBikeToGarage,
        removeBikeFromGarage,
        checkCompatibility,
        isGarageOpen,
        setIsGarageOpen,
      }}
    >
      {children}
    </GarageContext.Provider>
  );
}

export function useGarage() {
  const context = useContext(GarageContext);
  if (!context) throw new Error("useGarage must be used within GarageProvider");
  return context;
}
