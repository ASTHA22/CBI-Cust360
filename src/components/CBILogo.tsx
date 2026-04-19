import logoImage from './logo.png';

export default function CBILogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <img 
      src={logoImage} 
      alt="Central Bank of India" 
      className={className}
    />
  );
}
