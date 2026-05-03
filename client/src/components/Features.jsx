import React from 'react';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import { useMokayaTheme } from '../context/ThemeContext';

const Features = () => {
  const { theme } = useMokayaTheme();

  const data = [
    {
      icon: <LocalShippingIcon sx={{ fontSize: 40 }} />,
      title: "Envío Especializado",
      desc: "Transporte refrigerado para mantener la calidad de nuestros bombones."
    },
    {
      icon: <WorkspacePremiumIcon sx={{ fontSize: 40 }} />,
      title: "Calidad de Origen",
      desc: "Cacao 100% orgánico seleccionado de fincas sostenibles."
    },
    {
      icon: <CardGiftcardIcon sx={{ fontSize: 40 }} />,
      title: "Regalo Mokaya",
      desc: "Personalizá tus cajas con mensajes y envoltorios de lujo."
    }
  ];

  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center text-center space-y-4">
            <div style={{ color: theme.primary }}>
              {item.icon}
            </div>
            <h3 className="text-xl font-bold uppercase tracking-wider" 
                style={{ color: theme.primary, fontFamily: "'Playfair Display', serif" }}>
              {item.title}
            </h3>
            <p className="opacity-80 max-w-xs leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;