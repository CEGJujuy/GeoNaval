export const GEOGRAPHY_DATA = {
  // América
  america: [
    { country: 'Argentina', capital: 'Buenos Aires', difficulty: 'easy' },
    { country: 'Brasil', capital: 'Brasília', difficulty: 'medium' },
    { country: 'Chile', capital: 'Santiago', difficulty: 'easy' },
    { country: 'Colombia', capital: 'Bogotá', difficulty: 'easy' },
    { country: 'México', capital: 'Ciudad de México', difficulty: 'easy' },
    { country: 'Perú', capital: 'Lima', difficulty: 'easy' },
    { country: 'Venezuela', capital: 'Caracas', difficulty: 'easy' },
    { country: 'Ecuador', capital: 'Quito', difficulty: 'medium' },
    { country: 'Uruguay', capital: 'Montevideo', difficulty: 'medium' },
    { country: 'Paraguay', capital: 'Asunción', difficulty: 'medium' },
    { country: 'Bolivia', capital: 'Sucre', difficulty: 'hard' },
    { country: 'Canadá', capital: 'Ottawa', difficulty: 'medium' },
    { country: 'Estados Unidos', capital: 'Washington D.C.', difficulty: 'easy' },
    { country: 'Guatemala', capital: 'Ciudad de Guatemala', difficulty: 'hard' },
    { country: 'Costa Rica', capital: 'San José', difficulty: 'medium' }
  ],
  
  // Europa
  europe: [
    { country: 'España', capital: 'Madrid', difficulty: 'easy' },
    { country: 'Francia', capital: 'París', difficulty: 'easy' },
    { country: 'Italia', capital: 'Roma', difficulty: 'easy' },
    { country: 'Alemania', capital: 'Berlín', difficulty: 'easy' },
    { country: 'Reino Unido', capital: 'Londres', difficulty: 'easy' },
    { country: 'Portugal', capital: 'Lisboa', difficulty: 'easy' },
    { country: 'Grecia', capital: 'Atenas', difficulty: 'easy' },
    { country: 'Holanda', capital: 'Ámsterdam', difficulty: 'medium' },
    { country: 'Suecia', capital: 'Estocolmo', difficulty: 'medium' },
    { country: 'Noruega', capital: 'Oslo', difficulty: 'medium' },
    { country: 'Finlandia', capital: 'Helsinki', difficulty: 'hard' },
    { country: 'Dinamarca', capital: 'Copenhague', difficulty: 'medium' },
    { country: 'Austria', capital: 'Viena', difficulty: 'medium' },
    { country: 'Suiza', capital: 'Berna', difficulty: 'hard' },
    { country: 'Bélgica', capital: 'Bruselas', difficulty: 'medium' }
  ],
  
  // Asia
  asia: [
    { country: 'China', capital: 'Pekín', difficulty: 'easy' },
    { country: 'Japón', capital: 'Tokio', difficulty: 'easy' },
    { country: 'India', capital: 'Nueva Delhi', difficulty: 'easy' },
    { country: 'Corea del Sur', capital: 'Seúl', difficulty: 'medium' },
    { country: 'Tailandia', capital: 'Bangkok', difficulty: 'medium' },
    { country: 'Vietnam', capital: 'Hanói', difficulty: 'medium' },
    { country: 'Indonesia', capital: 'Yakarta', difficulty: 'medium' },
    { country: 'Filipinas', capital: 'Manila', difficulty: 'medium' },
    { country: 'Malasia', capital: 'Kuala Lumpur', difficulty: 'hard' },
    { country: 'Singapur', capital: 'Singapur', difficulty: 'easy' },
    { country: 'Mongolia', capital: 'Ulán Bator', difficulty: 'hard' },
    { country: 'Nepal', capital: 'Katmandú', difficulty: 'hard' },
    { country: 'Sri Lanka', capital: 'Colombo', difficulty: 'hard' },
    { country: 'Bangladesh', capital: 'Daca', difficulty: 'hard' },
    { country: 'Myanmar', capital: 'Naipyidó', difficulty: 'hard' }
  ],
  
  // África
  africa: [
    { country: 'Sudáfrica', capital: 'Ciudad del Cabo', difficulty: 'medium' },
    { country: 'Egipto', capital: 'El Cairo', difficulty: 'easy' },
    { country: 'Nigeria', capital: 'Abuya', difficulty: 'hard' },
    { country: 'Kenia', capital: 'Nairobi', difficulty: 'medium' },
    { country: 'Marruecos', capital: 'Rabat', difficulty: 'medium' },
    { country: 'Etiopía', capital: 'Adís Abeba', difficulty: 'hard' },
    { country: 'Ghana', capital: 'Acra', difficulty: 'hard' },
    { country: 'Tanzania', capital: 'Dodoma', difficulty: 'hard' },
    { country: 'Uganda', capital: 'Kampala', difficulty: 'hard' },
    { country: 'Argelia', capital: 'Argel', difficulty: 'medium' },
    { country: 'Túnez', capital: 'Túnez', difficulty: 'medium' },
    { country: 'Libia', capital: 'Trípoli', difficulty: 'hard' },
    { country: 'Senegal', capital: 'Dakar', difficulty: 'hard' },
    { country: 'Costa de Marfil', capital: 'Yamusukro', difficulty: 'hard' },
    { country: 'Camerún', capital: 'Yaundé', difficulty: 'hard' }
  ],
  
  // Oceanía
  oceania: [
    { country: 'Australia', capital: 'Canberra', difficulty: 'medium' },
    { country: 'Nueva Zelanda', capital: 'Wellington', difficulty: 'medium' },
    { country: 'Fiyi', capital: 'Suva', difficulty: 'hard' },
    { country: 'Papúa Nueva Guinea', capital: 'Puerto Moresby', difficulty: 'hard' },
    { country: 'Samoa', capital: 'Apia', difficulty: 'hard' },
    { country: 'Tonga', capital: 'Nukualofa', difficulty: 'hard' },
    { country: 'Vanuatu', capital: 'Puerto Vila', difficulty: 'hard' },
    { country: 'Islas Salomón', capital: 'Honiara', difficulty: 'hard' },
    { country: 'Palau', capital: 'Ngerulmud', difficulty: 'hard' },
    { country: 'Nauru', capital: 'Yaren', difficulty: 'hard' }
  ]
}

export const BONUS_QUESTIONS = {
  easy: [
    {
      question: "¿Cuál es el río más largo del mundo?",
      options: ["Nilo", "Amazonas", "Yangtsé", "Misisipi"],
      correct: 0
    },
    {
      question: "¿En qué continente está ubicado Egipto?",
      options: ["Asia", "África", "Europa", "América"],
      correct: 1
    },
    {
      question: "¿Cuál es el océano más grande?",
      options: ["Atlántico", "Índico", "Pacífico", "Ártico"],
      correct: 2
    }
  ],
  
  medium: [
    {
      question: "¿Cuál es la montaña más alta del mundo?",
      options: ["K2", "Everest", "Kangchenjunga", "Lhotse"],
      correct: 1
    },
    {
      question: "¿Qué país tiene más husos horarios?",
      options: ["Rusia", "Estados Unidos", "China", "Francia"],
      correct: 3
    },
    {
      question: "¿Cuál es el desierto más grande del mundo?",
      options: ["Sahara", "Gobi", "Antártida", "Kalahari"],
      correct: 2
    }
  ],
  
  hard: [
    {
      question: "¿Cuál es la capital de Bután?",
      options: ["Thimphu", "Paro", "Punakha", "Jakar"],
      correct: 0
    },
    {
      question: "¿En qué país se encuentra el lago Titicaca?",
      options: ["Solo en Perú", "Solo en Bolivia", "Perú y Bolivia", "Chile y Argentina"],
      correct: 2
    },
    {
      question: "¿Cuál es el punto más bajo de la Tierra?",
      options: ["Valle de la Muerte", "Mar Muerto", "Depresión de Qattara", "Fosa de las Marianas"],
      correct: 1
    }
  ]
}