import useZxing from "../../hooks/useZXing";

interface BarcodeScannerProps {
  onResult: (result: any) => void;
  onError: (error: any) => void;
}

export const BarcodeScanner: React.FC<BarcodeScannerProps> = ({
  onResult = () => {},
  onError = () => {},
}) => {
  const { ref } = useZxing({ onResult, onError });
  return <video ref={ref} />;
};
