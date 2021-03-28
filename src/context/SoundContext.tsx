import React, { useContext, useState } from 'react';

interface IChildren {
  children: React.ReactNode;
}

interface SoundContextType {
  volumeSound: number;
  setVolumeSound: (volumeSound: number) => void;
  isSoundOn: boolean;
  setIsSoundOn: (isSoundOn: boolean) => void;
}

const SoundContext = React.createContext<SoundContextType | undefined>(
  undefined
);

export const useSound = () => {
  return useContext(SoundContext);
};

export const SoundProvider = ({ children }: IChildren) => {
  const [volumeSound, setVolumeSound] = useState<number>(30);
  const [isSoundOn, setIsSoundOn] = useState(true);

  return (
    <SoundContext.Provider
      value={{ volumeSound, setVolumeSound, isSoundOn, setIsSoundOn }}
    >
      {children}
    </SoundContext.Provider>
  );
};
