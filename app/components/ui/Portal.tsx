import React, {
  PropsWithChildren,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { StyleSheet, View } from 'react-native';

type PortalContextValue = {
  render: (key: number, children: ReactNode) => void;
  unmount: (key: number) => void;
};

const PortalContext = createContext<PortalContextValue | null>(null);
let nextPortalKey = 0;

export const PortalProvider = ({ children }: PropsWithChildren) => {
  const [portals, setPortals] = useState<Record<number, ReactNode>>({});

  const render = useCallback((key: number, portalChildren: ReactNode) => {
    setPortals(currentPortals => ({
      ...currentPortals,
      [key]: portalChildren,
    }));
  }, []);

  const unmount = useCallback((key: number) => {
    setPortals(currentPortals => {
      const nextPortals = { ...currentPortals };
      delete nextPortals[key];
      return nextPortals;
    });
  }, []);

  const value = useMemo(() => ({ render, unmount }), [render, unmount]);

  return (
    <PortalContext.Provider value={value}>
      {children}
      <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
        {Object.entries(portals).map(([key, portalChildren]) => (
          <React.Fragment key={key}>{portalChildren}</React.Fragment>
        ))}
      </View>
    </PortalContext.Provider>
  );
};

export const Portal = ({ children }: PropsWithChildren) => {
  const portal = useContext(PortalContext);
  const key = useRef(nextPortalKey++).current;

  useEffect(() => {
    if (!portal) {
      return;
    }

    portal.render(key, children);
  }, [children, key, portal]);

  useEffect(() => {
    if (!portal) {
      return;
    }

    return () => {
      portal.unmount(key);
    };
  }, [key, portal]);

  if (!portal) {
    return <>{children}</>;
  }

  return null;
};
