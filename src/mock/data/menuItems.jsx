import { Person, Fastfood, BarChart, CalendarToday, Home, Newspaper } from '@mui/icons-material';

const iconStyle = { color: "#6e6e6e" }; 

export const menuItems = [
  {
    text: "Inicio",
    icon: <Home style={iconStyle} />,
    link: "/home/",
  },
  {
    text: "Pacientes",
    icon: <Person style={iconStyle} />,  
    link: "/home/paciente",
    submenus: [
      { text: "Lista de pacientes", link: "/home/paciente/" },
      { text: "Diagnósticos", link: "/home/" },
    ],
  },
  {
    text: "Plan alimenticio",
    icon: <Fastfood style={iconStyle} />,
    link: "/home/alimentos",
    submenus: [
      { text: "Crear Plan", link: "/home/alimentos" },
      { text: "Lista de alimentos", link: "/home/" },
      { text: "Macronutrientes", link: "/home/progreso/macronutrientes" },
      { text: "Recetas", link: "/home/" },
      
    ],
  },
  {
    text: "Seguimiento",
    icon: <BarChart style={iconStyle} />,
    link: "/home/progreso",
    submenus: [
      { text: "Métricas", link: "/home/progreso/metricas" },
      { text: "Estadísticas", link: "/home/progreso/calorias-consumidas" },
    ],
  },
  {
    text: "Turnos",
    icon: <CalendarToday style={iconStyle} />,
    link: "/home/turnos",
    submenus: [
      { text: "Nuevo turno", link: "/home/progreso/metricas" },
      { text: "Turnos", link: "/home/progreso/calorias-consumidas" },
      { text: "Calendario", link: "/home/progreso/calorias-consumidas" },
    ],
  },
  {
    text: "Perfil",
    icon: <Person style={iconStyle} />,
    link: "/home/perfil",
  },
  {
    text: "Blog",
    icon: <Newspaper style={iconStyle} />,
    link: "/home/perfil",
  },
];
