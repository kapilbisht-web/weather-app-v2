import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(
    typeof window !== 'undefined' ? navigator.onLine : true
  );
  const hasMountedRef = useRef(false);

  useEffect(() => {
    hasMountedRef.current = true;

    const handleOnline = () => {
      setIsOnline(true);
      if (hasMountedRef.current) toast.success("✅ You're back online!");
    };

    const handleOffline = () => {
      setIsOnline(false);
      if (hasMountedRef.current) toast.warn("⚠️ You're offline. Using cached data.");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
}

export default useOnlineStatus;