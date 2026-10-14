import type { IconType } from "react-icons";
import {
  FaAws, FaBook, FaBookOpen, FaBrain, FaCamera, FaCat, FaChartBar, FaChartLine, FaChess, FaChessBoard,
  FaChessKnight, FaChessQueen, FaCloud, FaCode, FaComments, FaCookieBite, FaCss3Alt, FaDatabase, FaDocker,
  FaFeather, FaFigma, FaFilm, FaFlask, FaFutbol, FaGamepad, FaGear, FaGitAlt, FaGithub, FaGlobe, FaGoogle,
  FaGraduationCap, FaGuitar, FaHeadphones, FaHeart, FaHtml5, FaIceCream, FaJs, FaLanguage, FaLaptopCode,
  FaLayerGroup, FaLeaf, FaLightbulb, FaMicrochip, FaMobileScreen, FaMoon, FaMugHot, FaMusic, FaNodeJs,
  FaPaintbrush, FaPalette, FaPaw, FaPenNib, FaPlane, FaPuzzlePiece, FaPython, FaReact, FaRobot, FaRocket,
  FaSeedling, FaServer, FaStar, FaSun, FaTerminal, FaTrophy, FaUsers, FaUtensils, FaWind,
} from "react-icons/fa6";

// Icons the admin dashboard can pick from. Names are stored in Supabase as plain strings.
export const icons: Record<string, IconType> = {
  FaRobot, FaBrain, FaCode, FaLaptopCode, FaTerminal, FaPython, FaJs, FaReact, FaNodeJs, FaHtml5, FaCss3Alt,
  FaDatabase, FaServer, FaCloud, FaAws, FaDocker, FaGitAlt, FaGithub, FaGoogle, FaFigma, FaMobileScreen,
  FaChartBar, FaChartLine, FaMicrochip, FaFlask, FaGear, FaLayerGroup, FaPuzzlePiece, FaLightbulb, FaRocket,
  FaPalette, FaPenNib, FaPaintbrush, FaFeather, FaGraduationCap, FaBook, FaBookOpen, FaLanguage, FaUsers,
  FaComments, FaTrophy, FaChess, FaChessBoard, FaChessKnight, FaChessQueen, FaHeart, FaStar, FaMoon, FaSun,
  FaMugHot, FaUtensils, FaCookieBite, FaIceCream, FaFilm, FaMusic, FaGuitar, FaHeadphones, FaCamera,
  FaGamepad, FaFutbol, FaPlane, FaGlobe, FaWind, FaLeaf, FaSeedling, FaPaw, FaCat,
};

export const iconNames = Object.keys(icons);

export function iconFor(name: string | null | undefined): IconType {
  return (name && icons[name]) || FaStar;
}
