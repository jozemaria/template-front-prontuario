const TOPIC_KEYWORDS = [
  // Equinos e termos do prontuário
  'cavalo', 'cavala', 'equino', 'equinos', 'equina', 'equinas', 'egua', 'garranhao',
  'potro', 'potra', 'poldro', 'cria', 'cavalaria', 'cavalgada', 'cavalgadura', 'haras',
  'cocheira', 'baia', 'casco', 'ferradura', 'ferrageamento', 'ferragear', 'ferrar',
  'sela', 'sela', 'brida', 'peleiro', 'cilhada', 'garupa', 'lombo', 'cruzeta',
  'esporao', 'embocadura', 'palafita', 'abrigo',

  // Medicina veterinária e profissão
  'veterinario', 'veterinaria', 'veterinarios', 'veterinarias', 'medicina veterinaria',
  'zoologico', 'zoologia', 'clinica veterinaria', 'consultorio veterinario', 'anatomia',
  'fisiologia', 'patologia', 'diagnostico', 'prognostico', 'semiotica', 'propedeutica',
  'cirurgia', 'anestesia', 'anestesico', 'eutanasia', 'profilaxia', 'bem-estar', 'bem estar',
  'sanidade', 'higiene', 'manejo', 'manejo sanitario', 'biosseguranca', 'quarentena',

  // Animais em geral
  'animal', 'animais', 'bovino', 'bovinos', 'bovina', 'ovino', 'ovinos', 'caprino',
  'caprinos', 'suino', 'suinos', 'canino', 'caninos', 'felino', 'felinos', 'cachorro',
  'cachorra', 'cao', 'gato', 'gata', 'ave', 'aves', 'galinha', 'galo', 'frango', 'peru',
  'pato', 'codorna', 'peixe', 'peixes', 'aquario', 'reptil', 'repteis', 'lagarto', 'serpente',
  'cobra', 'tartaruga', 'hamster', 'coelho', 'porquinho da india', 'roedor', 'roedores',
  'vaca', 'boi', 'touro', 'bezerro', 'bezerra', 'novilho', 'ovelha', 'cordeiro', 'cabra',
  'bode', 'porco', 'leitao', 'matriz', 'reproducao', 'prenhez', 'gestacao', 'parto',
  'distocia', 'natimorto', 'lactacao', 'desmame', 'mastite', 'mamite', 'semen', 'inseminacao',
  'monta', 'cruzamento', 'genealogia', 'raca', 'rebanho', 'plantel',

  // Sinais clínicos e sintomas
  'sintoma', 'sintomas', 'clinico', 'clinicos', 'febre', 'pirogenica', 'hipertermia',
  'hipotermia', 'dor', 'dores', 'doloroso', 'diarreia', 'colica', 'colicas', 'tosse',
  'tosse', 'espirro', 'espirros', 'coriza', 'secrecao nasal', 'secrecao ocular', 'claudicacao',
  'mancar', 'manqueira', 'lesao', 'lesoes', 'ferida', 'feridas', 'abcesso', 'abscesso',
  'hematoma', 'edema', 'inchaco', 'tumefacao', 'nodulo', 'nodulos', 'caroco', 'verruga',
  'alopecia', 'queda de pelo', 'queda de pelos', 'prurido', 'coceira', 'lambedura', 'escoriacao',
  'apatica', 'apatia', 'letargia', 'prostracao', 'depressao', 'inapetencia', 'falta de apetite',
  'emagrecimento', 'perda de peso', 'caquexia', 'desidratacao', 'vomito', 'regurgitacao',
  'engasgo', 'distensao abdominal', 'abdomen', 'disenteria', 'sangue nas fezes', 'melena',
  'hematoquezia', 'poliuria', 'polaciuria', 'disuria', 'anuria', 'hematiria', 'sangue na urina',
  'dispneia', 'dificuldade para respirar', 'taquipneia', 'bradipneia', 'estertor', 'ronqueira',
  'cianose', 'mucosa palida', 'mucosas', 'taquicardia', 'bradicardia', 'arritmia', 'pulso',
  'desmaio', 'convulsao', 'convulsoes', 'tremor', 'tremores', 'incoordenacao', 'andar em circulo',
  'reclinado', 'decubito', 'fraqueza', 'paralisia', 'paresia', 'atrofia', 'rigidez', 'contratura',
  'edema de casco', 'fissura de casco', 'fratura', 'luxacao', 'entorse', 'torcao', 'ruptura',
  'tendinite', 'bursite', 'artrite', 'osteomielite', 'miosite', 'laminite', 'abscesso de casco',
  'ferradura encravada', 'apico', 'crescimento excessivo', 'desvio de eixo', 'casco rachado',

  // Tratamento e medicamentos
  'tratamento', 'tratamentos', 'medicamento', 'medicamentos', 'medicacao', 'farmaco',
  'farmacos', 'posologia', 'dose', 'doses', 'dosagem', 'prescricao', 'receita', 'aplicacao',
  'via de administracao', 'parenteral', 'oral', 'endovenosa', 'intravenosa', 'intramuscular',
  'subcutanea', 'topico', 'colirio', 'pomada', 'creme', 'gel', 'spray', 'curativo', 'atadura',
  'soro', 'fluidoterapia', 'infusao', 'antibiotico', 'antibioticos', 'antimicrobiano',
  'anti-inflamatorio', 'antiinflamatorio', 'analgesico', 'analgesicos', 'antipiretico',
  'antiespasmodico', 'antiemetico', 'antidiarreico', 'laxante', 'vermifugo', 'anti-helmintico',
  'antiparasitario', 'inseticida', 'acaricida', 'carrapaticida', 'pulguicida', 'ectoparasitico',
  'endoparasitico', 'vacina', 'vacinas', 'vacinacao', 'imunizacao', 'reforco vacinal', 'titra',
  'soro hiperimune', 'imunoglobulina', 'probiótico', 'probiotico', 'prebiotico', 'suplemento',
  'suplementos', 'vitamina', 'vitaminas', 'mineral', 'minerais', 'eletrolitos', 'sal mineral',
  'raçao', 'racao', 'feno', 'silagem', 'pastagem', 'pasto', 'capim', 'volumoso', 'concentrado',
  'proteinado', 'suplementacao', 'dieta', 'dietas', 'nutricional', 'desnutricao', 'obesidade',
  'sobrepeso', 'escore corporal',

  // Principais medicamentos veterinários (sem acento para comparação)
  'dipirona', 'metamizol', 'fenilbutazona', 'flunixina', 'meloxicam', 'cetoprofeno',
  'carprofeno', 'firocoxib', 'corticoide', 'corticosteroide', 'dexametasona', 'prednisona',
  'prednisolona', 'ivermectina', 'doramectina', 'moxidectina', 'abamectina', 'praziquantel',
  'fenbendazol', 'albendazol', 'levamisol', 'pamoato de pirantel', 'fipronil', 'amitraz',
  'imida-cloprida', 'imidacloprida', 'selamectina', 'lufenuron', 'penicilina', 'amoxicilina', 'ampicilina',
  'cefalexina', 'ceftiofur', 'gentamicina', 'amicasina', 'enrofloxacina', 'ciprofloxacino',
  'marbofloxacina', 'doxiciclina', 'tetraciclina', 'azitromicina', 'claritromicina', 'eritromicina',
  'tilmicosina', 'tulatromicina', 'xilazina', 'detomidina', 'butorfanol', 'morfina', 'tramadol',
  'diazepam', 'midazolam', 'acepromazina', 'cetamina', 'propofol', 'isoflurano', 'sevoflurano',
  'gualfenesina', 'atropina', 'epinefrina', 'adrenalina', 'noradrenalina', 'lidocaina',
  'bupivacaina', 'omeprazol', 'ranitidina', 'misoprostol', 'sucralfato', 'metoclopramida',
  'domperidona', 'dimenidrinato', 'sulfadiazina', 'trimetoprima', 'metronidazol', 'nistatina',
  'fluconazol', 'itraconazol', 'terbinafina', 'permanganato', 'clorexidina', 'iodo', 'alcool',
  'agua oxigenada', 'peroxido', 'rifamicina', 'neomicina', 'bacitracina', 'polimixina',

  // Exames complementares
  'exame', 'exames', 'laboratorial', 'laboratoriais', 'hemograma', 'bioquimico', 'bioquimica',
  'creatinina', 'ureia', 'glicose', 'glucose', 'enzimas', 'transaminases', 'ast', 'alt', 'gama gt',
  'eletroforese', 'urinalise', 'urinálise', 'cultura', 'antibiograma', 'coprocultura',
  'exame de fezes', 'flotacao', 'ovos por grama', 'opg', 'citologia', 'biopsia', 'necropsia',
  'radiografia', 'raio-x', 'raios-x', 'ultrassonografia', 'ultrassom', 'endoscopia', 'laparoscopia',
  'eletrocardiograma', 'ecg', 'ecocardiograma', 'tomografia', 'ressonancia', 'gastroscopia',
  'artroscopia', 'retinoscopia', 'oftalmoscopia', 'puncao', 'lavado broncoalveolar', 'lavado peritoneal',

  // Doenças e condições
  'doenca', 'doencas', 'enfermidade', 'sindrome', 'sindromes', 'infeccao', 'infeccoes',
  'contaminacao', 'sepse', 'septicemia', 'bacteremia', 'viremia', 'viral', 'bacteriana',
  'fungica', 'parasitária', 'parasitaria', 'zoonose', 'zoonoses', 'raiva', 'leptospirose',
  'brucelose', 'tuberculose', 'anaplasmose', 'babesiose', 'peste equina', 'mormo', 'anca',
  'estomatite vesicular', 'influenza equina', 'gripe equina', 'herpesvirus', 'rhinopneumonite',
  'arterite viral', 'tetanos', 'botulismo', 'salmonelose', 'colibacilose', 'clostridiose',
  'laminite', 'sindrome do cabrito', 'reverberacao', 'ulcera gastrica', 'ulcera gástrica',
  'gastrite', 'enterite', 'colite', 'constipacao', 'impactacao', 'torcao intestinal', 'intussuscepcao',
  'hérnia', 'hernia', 'onfalocele', 'criptorquidia', 'nefropatia', 'insuficiencia renal',
  'urolitiase', 'cistite', 'pielonefrite', 'hepatite', 'hepatopatia', 'pancreatite', 'colelitíase',
  'pneumonia', 'broncopneumonia', 'pleurite', 'pleuropneumonia', 'efusao pleural', 'garrote',
  'sindrome respiratoria', 'rinitis', 'faringite', 'laringite', 'traqueite', 'sindrome dos vias aereas',
  'hemiplegia laringea', 'golpe de calor', 'insolacao', 'desidratação', 'choque', 'hipovolemia',
  'anemia', 'politremia', 'leucopenia', 'leucocitose', 'trombocitopenia', 'coagulopatia',
  'cancer', 'tumor', 'tumores', 'neoplasia', 'neoplasias', 'metastase', 'carcinoma', 'sarcoma',
  'melanoma', 'papiloma', 'cistadenoma', 'cistadenocarcinoma', 'linfoma', 'leukemia', 'leucemia',

  // Cuidados, comportamento e manejo
  'cuidado', 'cuidados', 'higiene', 'banho', 'escovacao', 'tosquia', 'corte de casco',
  'cascamento', 'protese de casco', 'casqueamento', 'ferrageamento', 'toalete', 'limpeza',
  'desinfecao', 'esterilizacao', 'castracao', 'vasectomia', 'ovariosalpingo-histerectomia',
  'cesariana', 'cesarea', 'palpacao', 'auscultacao', 'inspecao', 'palpacao retal', 'exame clinico',
  'anamnese', 'termometria', 'frequencia cardiaca', 'frequencia respiratoria', 'tempo de reenchimento',
  'trpc', 'desidratação', 'nivel de hidratacao', 'comportamento', 'agressividade', 'estereotipia',
  'compulsao', 'orelha baixa', 'deitado', 'rolamento', 'bruxismo', 'piloerecao', 'pelo ericado',
  'isolamento do grupo', 'urinar', 'defecar', 'ingestao', 'ruminacao', 'mastigacao', 'apetite',
  'sede', 'polidipsia', 'perda de peso', 'ganho de peso', 'desempenho', 'adestramento', 'treinamento',
  'esforco', 'fadiga', 'cansaço', 'recuperacao', 'condicionamento', 'atleta', 'esportivo',
  'adestrado', 'passeio', 'montaria', 'doma', 'domacao', 'selagem',

  // Genéricos de conversação que sinalizam foco no tema
  'equina', 'equestre', 'equitacao', 'hipico', 'hippico', 'cavalos',
  'ferramentas de casco', 'casqueador', 'cavalariço', 'cavalariça'
];

const normalize = (texto) =>
  String(texto)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function countTopicMatches(texto) {
  const text = normalize(texto);
  if (!text) return 0;

  let matches = 0;
  for (const keyword of TOPIC_KEYWORDS) {
    const kw = normalize(keyword).trim();
    if (!kw) continue;
    const re = new RegExp(`(^|[^a-z0-9])${escapeRegExp(kw)}([^a-z0-9]|$)`);
    if (re.test(text)) matches++;
  }
  return matches;
}

function isVeterinaryTopic(texto) {
  return countTopicMatches(texto) >= 1;
}

module.exports = { isVeterinaryTopic, countTopicMatches };
