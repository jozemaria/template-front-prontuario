export const TOPIC_KEYWORDS: string[] = [
  // Equinos e termos do prontuário
  'cavalo', 'cavala', 'equino', 'equinos', 'equina', 'equinas', 'egua', 'garranhao',
  'potro', 'potra', 'poldro', 'cria', 'cavalaria', 'cavalgada', 'haras', 'cocheira',
  'baia', 'casco', 'ferradura', 'ferrageamento', 'ferrar', 'sela', 'brida', 'garupa',
  'lombo', 'equitacao', 'equestre', 'hipico', 'cavalos',

  // Medicina veterinária e profissão
  'veterinario', 'veterinaria', 'veterinarios', 'veterinarias', 'medicina veterinaria',
  'zoologia', 'clinica veterinaria', 'anatomia', 'fisiologia', 'patologia', 'diagnostico',
  'prognostico', 'semiotica', 'propedeutica', 'cirurgia', 'anestesia', 'anestesico',
  'eutanasia', 'profilaxia', 'bem-estar', 'bem estar', 'sanidade', 'higiene', 'manejo',
  'biosseguranca', 'quarentena',

  // Animais em geral
  'animal', 'animais', 'bovino', 'bovinos', 'bovina', 'ovino', 'ovinos', 'caprino',
  'caprinos', 'suino', 'suinos', 'canino', 'caninos', 'felino', 'felinos', 'cachorro',
  'cachorra', 'cao', 'gato', 'gata', 'ave', 'aves', 'galinha', 'galo', 'frango', 'peru',
  'pato', 'codorna', 'peixe', 'peixes', 'aquario', 'reptil', 'repteis', 'lagarto',
  'serpente', 'cobra', 'tartaruga', 'hamster', 'coelho', 'porquinho da india', 'roedor',
  'roedores', 'vaca', 'boi', 'touro', 'bezerro', 'novilho', 'ovelha', 'cordeiro', 'cabra',
  'bode', 'porco', 'leitao', 'matriz', 'reproducao', 'prenhez', 'gestacao', 'parto',
  'distocia', 'lactacao', 'desmame', 'mastite', 'semen', 'inseminacao', 'cruzamento',
  'genealogia', 'raca', 'rebanho', 'plantel',

  // Sinais clínicos e sintomas
  'sintoma', 'sintomas', 'clinico', 'clinicos', 'febre', 'hipertermia', 'hipotermia',
  'dor', 'dores', 'doloroso', 'diarreia', 'colica', 'colicas', 'tosse', 'espirro',
  'coriza', 'secrecao', 'claudicacao', 'mancar', 'manqueira', 'lesao', 'lesoes', 'ferida',
  'feridas', 'abcesso', 'abscesso', 'hematoma', 'edema', 'inchaco', 'nodulo', 'nodulos',
  'caroco', 'verruga', 'alopecia', 'queda de pelo', 'prurido', 'coceira', 'escoriacao',
  'apatica', 'apatia', 'letargia', 'prostracao', 'depressao', 'inapetencia', 'falta de apetite',
  'emagrecimento', 'perda de peso', 'caquexia', 'desidratacao', 'vomito', 'regurgitacao',
  'engasgo', 'distensao abdominal', 'abdomen', 'disenteria', 'sangue nas fezes', 'melena',
  'poliuria', 'polaciuria', 'disuria', 'anuria', 'hematiria', 'sangue na urina', 'dispneia',
  'dificuldade para respirar', 'taquipneia', 'estertor', 'cianose', 'mucosa palida',
  'mucosas', 'taquicardia', 'bradicardia', 'arritmia', 'pulso', 'desmaio', 'convulsao',
  'convulsoes', 'tremor', 'tremores', 'incoordenacao', 'reclinado', 'decubito', 'fraqueza',
  'paralisia', 'paresia', 'atrofia', 'rigidez', 'contratura', 'fissura de casco', 'fratura',
  'luxacao', 'entorse', 'torcao', 'ruptura', 'tendinite', 'bursite', 'artrite',
  'osteomielite', 'miosite', 'laminite', 'casco rachado',

  // Tratamento e medicamentos
  'tratamento', 'tratamentos', 'medicamento', 'medicamentos', 'medicacao', 'farmaco',
  'farmacos', 'posologia', 'dose', 'doses', 'dosagem', 'prescricao', 'receita', 'aplicacao',
  'parenteral', 'oral', 'endovenosa', 'intravenosa', 'intramuscular', 'subcutanea', 'topico',
  'colirio', 'pomada', 'creme', 'gel', 'spray', 'curativo', 'atadura', 'soro', 'fluidoterapia',
  'infusao', 'antibiotico', 'antibioticos', 'antimicrobiano', 'anti-inflamatorio',
  'antiinflamatorio', 'analgesico', 'analgesicos', 'antipiretico', 'antiespasmodico',
  'antiemetico', 'antidiarreico', 'laxante', 'vermifugo', 'anti-helmintico',
  'antiparasitario', 'inseticida', 'acaricida', 'carrapaticida', 'pulguicida', 'vacina',
  'vacinas', 'vacinacao', 'imunizacao', 'reforco vacinal', 'soro hiperimune', 'probiotico',
  'prebiotico', 'suplemento', 'suplementos', 'vitamina', 'vitaminas', 'mineral', 'minerais',
  'eletrolitos', 'sal mineral', 'racao', 'feno', 'silagem', 'pastagem', 'pasto', 'capim',
  'volumoso', 'concentrado', 'suplementacao', 'dieta', 'dietas', 'nutricional', 'desnutricao',
  'obesidade', 'sobrepeso', 'escore corporal',

  // Principais medicamentos
  'dipirona', 'metamizol', 'fenilbutazona', 'flunixina', 'meloxicam', 'cetoprofeno',
  'carprofeno', 'firocoxib', 'corticoide', 'corticosteroide', 'dexametasona', 'prednisona',
  'prednisolona', 'ivermectina', 'doramectina', 'moxidectina', 'praziquantel', 'fenbendazol',
  'albendazol', 'levamisol', 'fipronil', 'amitraz', 'imidacloprida', 'selamectina', 'lufenuron',
  'penicilina', 'amoxicilina', 'ampicilina', 'cefalexina', 'ceftiofur', 'gentamicina',
  'amicasina', 'enrofloxacina', 'ciprofloxacino', 'marbofloxacina', 'doxiciclina',
  'tetraciclina', 'azitromicina', 'claritromicina', 'eritromicina', 'tilmicosina',
  'xilazina', 'detomidina', 'butorfanol', 'morfina', 'tramadol', 'diazepam', 'midazolam',
  'acepromazina', 'cetamina', 'propofol', 'isoflurano', 'sevoflurano', 'atropina',
  'epinefrina', 'adrenalina', 'lidocaina', 'bupivacaina', 'omeprazol', 'ranitidina',
  'metoclopramida', 'domperidona', 'sulfadiazina', 'trimetoprima', 'metronidazol', 'nistatina',
  'fluconazol', 'itraconazol', 'terbinafina', 'clorexidina', 'iodo', 'neomicina', 'bacitracina',

  // Exames complementares
  'exame', 'exames', 'laboratorial', 'laboratoriais', 'hemograma', 'bioquimico', 'bioquimica',
  'creatinina', 'ureia', 'glicose', 'glucose', 'enzimas', 'urinalise', 'cultura', 'antibiograma',
  'coprocultura', 'exame de fezes', 'flotacao', 'citologia', 'biopsia', 'necropsia',
  'radiografia', 'raio-x', 'raios-x', 'ultrassonografia', 'ultrassom', 'endoscopia',
  'laparoscopia', 'eletrocardiograma', 'ecg', 'ecocardiograma', 'tomografia', 'ressonancia',
  'gastroscopia', 'artroscopia', 'puncao', 'lavado broncoalveolar', 'lavado peritoneal',

  // Doenças e condições
  'doenca', 'doencas', 'enfermidade', 'sindrome', 'sindromes', 'infeccao', 'infeccoes',
  'contaminacao', 'sepse', 'septicemia', 'viremia', 'viral', 'bacteriana', 'fungica',
  'parasitaria', 'zoonose', 'zoonoses', 'raiva', 'leptospirose', 'brucelose', 'tuberculose',
  'anaplasmose', 'babesiose', 'mormo', 'anca', 'estomatite vesicular', 'influenza equina',
  'gripe equina', 'herpesvirus', 'rhinopneumonite', 'tetanos', 'botulismo', 'salmonelose',
  'colibacilose', 'clostridiose', 'laminite', 'ulcera gastrica', 'gastrite', 'enterite',
  'colite', 'constipacao', 'impactacao', 'torcao intestinal', 'intussuscepcao', 'hernia',
  'criptorquidia', 'nefropatia', 'insuficiencia renal', 'urolitiase', 'cistite', 'pielonefrite',
  'hepatite', 'hepatopatia', 'pancreatite', 'pneumonia', 'broncopneumonia', 'pleurite',
  'pleuropneumonia', 'rinitis', 'faringite', 'laringite', 'traqueite', 'golpe de calor',
  'insolacao', 'choque', 'hipovolemia', 'anemia', 'leucopenia', 'leucocitose',
  'trombocitopenia', 'coagulopatia', 'cancer', 'tumor', 'tumores', 'neoplasia', 'neoplasias',
  'metastase', 'carcinoma', 'sarcoma', 'melanoma', 'papiloma', 'linfoma', 'leucemia',

  // Cuidados, comportamento e manejo
  'cuidado', 'cuidados', 'higiene', 'banho', 'escovacao', 'tosquia', 'corte de casco',
  'casqueamento', 'toalete', 'limpeza', 'desinfecao', 'esterilizacao', 'castracao',
  'vasectomia', 'cesariana', 'cesarea', 'palpacao', 'auscultacao', 'inspecao',
  'exame clinico', 'anamnese', 'termometria', 'frequencia cardiaca', 'frequencia respiratoria',
  'comportamento', 'agressividade', 'estereotipia', 'compulsao', 'piloerecao', 'bruxismo',
  'isolamento do grupo', 'urinar', 'defecar', 'ingestao', 'ruminacao', 'mastigacao',
  'apetite', 'sede', 'polidipsia', 'perda de peso', 'ganho de peso', 'desempenho',
  'adestramento', 'treinamento', 'esforco', 'fadiga', 'recuperacao', 'condicionamento',
  'atleta', 'esportivo', 'passeio', 'montaria', 'doma', 'domacao', 'selagem'
];

export const normalizeText = (texto: string): string =>
  texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

const escapeRegExp = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export function isVeterinaryTopic(texto: string): boolean {
  const text = normalizeText(texto);
  if (!text) return false;

  return TOPIC_KEYWORDS.some((keyword) => {
    const kw = normalizeText(keyword).trim();
    if (!kw) return false;
    const re = new RegExp(`(^|[^a-z0-9])${escapeRegExp(kw)}([^a-z0-9]|$)`);
    return re.test(text);
  });
}

export const OFF_TOPIC_MESSAGE =
  'Este assistente responde apenas sobre medicina veterinária, saúde, nutrição, manejo e bem-estar de equinos e demais animais. Por favor, reformule sua pergunta dentro desse tema.';
