import { defineStore } from 'pinia'
import { ref, computed, reactive } from 'vue'

// Типы для заданий
export interface TaskContent {
  image?: string
  audio?: string
  caption?: string
  code?: string
  riddle?: string
  crossword?: {
    vertical: Array<{ number: number; clue: Array<{ src: string; alt: string }>; answer: string }>
    horizontal: Array<{ number: number; clue: Array<{ src: string; alt: string }>; answer: string }>
    image?: string
    solvedImage?: string
  }
  explanation?: string
  cipher?: string
  principles?: Array<{ text: string; correct: boolean }>
  memories?: Array<{
    title: string
    text: string
    defaultExpanded?: boolean
  }>
  memory?: string
  hint?: string
  hintImage?: string
}

export interface Task {
  id: number
  title: string
  description: string
  type:
    | 'puzzle'
    | 'audio'
    | 'morse'
    | 'riddle'
    | 'crossword'
    | 'cipher'
    | 'principles'
    | 'memory'
    | 'congratulation'
  content: TaskContent
  answer?: string
  memory?: string
  images?: Array<{
    src: string
    title: string
  }>
}

export const useTaskStore = defineStore('tasks', () => {
  // Текущий индекс задания
  const currentTaskIndex = ref(0)

  // Прогресс пользователя
  const completedTasks = ref<number[]>([])

  // Показывать ли ответ
  const showAnswer = ref(false)

  // Локальное состояние задания
  const currentSlide = ref(0)
  const selectedPrinciples = reactive<Record<string, boolean>>({})
  const principleChecked = reactive<Record<string, boolean>>({})
  const showHint = ref(false)
  const showAnswerLocal = ref(false)

  // Список всех заданий
  const tasks = ref<Task[]>([
    {
      id: 1,
      title: 'Задание 1',
      description:
        'Необходимо решить ребус, чтобы узнать, в каком году родился И.И.Бродский. Каждый музейный экспонат - определенное зашифрованное число. Решив уравнения и разгадав все числа, можно узнать две последние цифры года рождения художника.',
      type: 'puzzle',
      content: {
        image: '/quiz/images/puzzle1.jpeg',
      },
      answer: '1884 год',
      memory:
        'И.И.Бродский писал: «С очень раннего возраста я пристрастился к рисованию, вернее к перерисовыванию и обрисовыванию всяческих узоров, эмблем, виньеток на тетрадках и книжках, попадавших в мои детские руки».',
    },
    {
      id: 2,
      title: 'Задание 2',
      description:
        'Попробуем ощутить себя И.И.Бродским. Необходимо прослушать часть произведения Ференца Листа и поразмышлять, как данный фрагмент мог повлиять на творчество художника.',
      type: 'audio',
      content: {
        audio: '/quiz/audio/list_rhapsody12.mp3',
        caption: 'Ф. Лист, Рапсодия №12. Исполняет Владимир Иванов.',
      },
      answer: '',
    },
    {
      id: 3,
      title: 'Задание 3',
      description:
        'Для того, чтобы узнать фамилию художника, в галерее которого побывал И.И.Бродский, необходимо разгадать шифр. Перед вами картинка, на которой представлена расшифровка каждой буквы русского алфавита в соответствии с Азбукой Морзе. Необходимо разгадать шифр, опираясь на данную иллюстрацию.',
      type: 'morse',
      content: {
        image: '/quiz/images/morse.jpg',
        code: '/quiz/images/morse_input.png',
      },
      answer: 'Иван Константинович Айвазовский',
      memory:
        'Меня, как будущего художника сразу же повели в галерею Айвазовского. Помню, с каким большим волнением подходил я к зданию галереи и с каким вдохновенным трепетом осматривал, впервые в жизни, настоящие картины. Уже уходя из большого зала, я увидел небольшую полуоткрытую дверь, за которую решил заглянуть, в надежде, что и там висят такие же замечательные картины. Дверь вела в небольшую светлую комнату, в которой я увидел мольберт и на нем картину, очевидно, только недавно начатую. Рядом, на табурете, лежали палитра и кисти, на них были еще свежие краски. Я посмотрел на эти диковинные вещи и быстро вышел. То была мастерская самого Айвазовского, художника, сотворившего столько чудесных полотен, казавшихся мне тогда пределом живописного мастерства. Увидев воочию мастерскую художника, я еще больше преисполнился благоговением перед искусством этого великого мастера и весь день чувствовал себя счастливцем.',
      images: [
        {
          src: '/quiz/images/aivazovsky.png',
          title: 'И.К.Айвазовский "Девятый вал"',
        },
      ],
    },
    {
      id: 4,
      title: 'Задание 4',
      description:
        'Разгадайте загадку, чтобы узнать, на кого поступает И.И.Бродский в Одесском Художественном училище.',
      type: 'riddle',
      content: {
        riddle:
          'Создаю здания я, мечты воплощаю,\nПроекты рисую, пространство формирую.\nВсегда меня ждут с чертежами в руках,\nКто я, скажи, при этих делах?',
      },
      answer: 'Архитектор/архитектурное отделение',
    },
    {
      id: 5,
      title: 'Задание 5',
      description: 'Решив ребус, можно узнать, к кому же так мечтал попасть учиться И.И.Бродский.',
      type: 'puzzle',
      content: {
        image: '/quiz/images/puzzle2.jpeg',
      },
      answer: 'Илья Ефимович Репин',
      memory:
        'Я несколько дней ходил на квартиру к Репину, просил его принять меня к себе, но он все время отказывал, ссылаясь на тесноту в мастерской. Тогда я попросил устроить меня где-нибудь, в любом уголке. Он мне ответил: «Если вы можете работать при таких условиях, то начинайте».',
      images: [
        {
          src: '/quiz/images/repin1.png',
          title: 'И.Е.Репин "Иван Грозный и сын его Иван 16 ноября 1581 года"',
        },
        {
          src: '/quiz/images/repin2.png',
          title: 'И.Е.Репин "Запорожцы пишут письмо турецкому султану"',
        },
        {
          src: '/quiz/images/repin3.png',
          title: 'И.Е.Репин "Бурлаки на Волге"',
        },
      ],
    },
    {
      id: 6,
      title: 'Задание 6',
      description:
        'Первым вариантом дипломной работы художника стал эскиз «Тишина». Но работа в итоге не была представлена. Есть ли предположения, что могло случится с эскизом?',
      type: 'puzzle',
      content: {
        memory:
          'Настроение у меня было мрачное, мною овладел какой-то безотчетный страх смерти. С этим подавлявшим меня чувством я стал бороться и искать выхода в своем творчестве.',
        hint: 'Подумайте о безопасности художественных работ на выставках.',
        hintImage: '/quiz/images/hintImage.avif',
      },
      answer:
        'Эскиз был украден с академической выставки. Дальнейшая судьба этой работы неизвестна.',
    },
    {
      id: 7,
      title: 'Задание 7',
      description:
        'Для того, чтобы узнать, какие европейские страны посетил И.И.Бродский, нам необходимо решить кроссворд, где каждая страна зашифрована картинками.',
      type: 'crossword',
      content: {
        crossword: {
          vertical: [
            {
              number: 2,
              clue: [
                { src: '/quiz/images/crossword/austria1.jpg', alt: 'Скрипка' },
                { src: '/quiz/images/crossword/austria2.jpg', alt: 'Кофе' },
              ],
              answer: 'Австрия',
            },
            {
              number: 3,
              clue: [
                { src: '/quiz/images/crossword/spain1.jpg', alt: 'Танцы' },
                { src: '/quiz/images/crossword/spain2.png', alt: 'Паэлья' },
              ],
              answer: 'Испания',
            },
          ],
          horizontal: [
            {
              number: 1,
              clue: [
                { src: '/quiz/images/crossword/france1.jpg', alt: 'Багет' },
                { src: '/quiz/images/crossword/france3.png', alt: 'Художник' },
                { src: '/quiz/images/crossword/france2.jpg', alt: 'Петух' },
              ],
              answer: 'Франция',
            },
            {
              number: 4,
              clue: [
                { src: '/quiz/images/crossword/germany1.jpg', alt: 'Пиво' },
                { src: '/quiz/images/crossword/germany2.jpg', alt: 'Праздник' },
              ],
              answer: 'Германия',
            },
            {
              number: 5,
              clue: [
                { src: '/quiz/images/crossword/england1.jpg', alt: 'Чай' },
                { src: '/quiz/images/crossword/england2.jpg', alt: 'Автобус' },
                { src: '/quiz/images/crossword/england3.jpg', alt: 'Суп' },
              ],
              answer: 'Англия',
            },
          ],
          image: '/quiz/images/cross.jpg',
          solvedImage: '/quiz/images/cross_fill.jpg',
        },
      },
      answer: 'Франция, Австрия, Испания, Германия, Англия',
    },
    {
      id: 8,
      title: 'Задание 8',
      description:
        'Давайте с вами узнаем имена художников, с произведениями которых познакомился И.И. Бродский в заграничной поездке, а также посмотрим на их знаменитые полотна.',
      type: 'puzzle',
      content: {
        image: '/quiz/images/artists.png',
      },
    },
    {
      id: 9,
      title: '',
      description: '',
      type: 'memory',
      content: {
        memories: [
          {
            title: 'Воспоминание о М. Горьком',
            text: 'Со свойственной ему проницательностью Горький уловил особенности моего дарования и чутко, с дружеской заботливостью поддерживал мои искания. Он высоко оценивал мои удачи, и это было для меня стимулом к большой творческой работе. Он сильно любил жизнь, природу, людей и этой любовью воодушевлял меня…',
            defaultExpanded: true,
          },
        ],
      },
      images: [
        {
          src: '/quiz/images/gorky1.jpg',
          title: 'И.И.Бродский «Портрет Максима Горького»',
        },
        {
          src: '/quiz/images/gorky2.png',
          title: 'И.И. Бродский «А.М. Горький-буревестник»',
        },
      ],
    },
    {
      id: 10,
      title: 'Задание 9',
      description:
        'Для того, чтобы узнать, какое событие значительно повлияло на И.И.Бродского и его судьбу, следует разгадать шифр Цезаря.',
      type: 'cipher',
      content: {
        explanation:
          'Шифр Цезаря основан на замене каждой буквы в тексте на букву, которая находится на определённом числе позиций дальше в алфавите. Это число позиций называется сдвигом. Например, если у нас есть слово «музей», и мы выбираем сдвиг на 1, это означает, что каждая буква этого слова должна быть заменена на следующую за ней букву в русском алфавите.\nДавайте посмотрим, как это работает на примере слова «музей»:\nБерём первую букву «м». В алфавите буква «н» идёт сразу после буквы «м», значит, мы заменяем её на «н».\nСледующая буква — «у». После неё в алфавите идёт буква «ф», следовательно, заменяем «у» на «ф».\nБуква «з» будет заменена на букву «и», так как за «з» следует «и».\nИ так далее. Таким образом, если мы зашифруем слово «музей» со сдвигом на 1, то получим слово «нфиёк». Соответственно, чтобы шифр превратился в слово, нужно сдвигаться на одну букву назад, то есть перед  «н» идет «м» и так далее.\nВзяв сдвиг на 2, разгадаем необходимое слово.',
        cipher: 'Тждрнашкб',
      },
      answer: 'Революция',
    },
    {
      id: 11,
      title: '',
      description: '',
      type: 'memory',
      content: {
        memories: [
          {
            title: 'Рекомендательное письмо А. В. Луначарского к В. И. Ленину',
            text: 'Дорогой Владимир Ильич! Податель сего, художник Бродский, один из талантливейших артистов кисти нашего времени, хочет сделать с Вас портрет. Я полагаю, что желание его должно быть удовлетворено. Вряд ли кто-нибудь другой может передать для истории со всей желательной полнотой и яркостью Вас, как лицо, принадлежавшее отныне не себе, а человечеству. С точки зрения этической и политической художник Бродский заслуживает полного доверия.',
            defaultExpanded: true,
          },
          {
            title: 'Воспоминание о встрече с В.И. Лениным',
            text: 'Пристально всмотревшись в карандашный набросок, Владимир Ильич ответил мне, что он не похож на себя. Окружающие стали убеждать Владимира Ильича в том, что он очень похож, что он совершенно не знает своего лица в профиль и что портрет, без сомнения, удачен. Владимир Ильич усмехнулся и принялся подписывать рисунок. — Первый раз в жизни подписываюсь под тем, с чем не согласен!— сказал он с улыбкой, передавая мне обратно набросок. Но через несколько минут, когда рисунок пошел по рукам и большинство сказало, что сходство уловлено большое, Владимир Ильич, снова посмотрев, промолвил: «А ведь, кажется, действительно похож».',
            defaultExpanded: true,
          },
        ],
      },
    },
    {
      id: 12,
      title: 'Задание 10',
      description:
        'Давайте с вами представим, что мы - педагоги в Академии художеств. Попробуем определить, какими принципами стоит пользоваться, а какими стоит избегать в соответствии с мнением И.И.Бродского.',
      type: 'principles',
      content: {
        principles: [
          {
            text: 'Ученику не стоит говорить о том, как сам учился, как упорно постигал технику трудного живописного мастерства, как преодолевал все трудности освоения этого ремесла.',
            correct: false,
          },
          {
            text: 'Весьма важно рисование по памяти, быстрые наброски в альбом, с которым художник не должен расставаться.',
            correct: true,
          },
          {
            text: 'Учить живописи нельзя — можно только помочь выучиться, передавая студенту свой опыт, накопленный на протяжении личной долголетней практики как художника.',
            correct: true,
          },
          {
            text: 'Советовать ученику можно всё, а не только то, во что сам твердо веришь, что сам хорошо усвоил.',
            correct: false,
          },
          {
            text: 'Работа ученика должна быть быстрой, а не длительной.',
            correct: false,
          },
          {
            text: 'Мастерство завоевывается терпеливым, упорным трудом.',
            correct: true,
          },
        ],
      },
      answer:
        'Верные принципы И.И.Бродского: "Весьма важно рисование по памяти, быстрые наброски в альбом", "Учить живописи нельзя — можно только помочь выучиться, передавая студенту свой опыт", "Мастерство завоевывается терпеливым, упорным трудом". Неверные принципы: "Ученику не стоит говорить о том, как сам учился...", "Советовать ученику можно всё...", "Работа ученика должна быть быстрой..."',
    },

    {
      id: 13,
      title: 'Задание 11',
      description:
        'Необходимо решить ребус, чтобы узнать, в каком году умер И.И.Бродский. Каждый музейный экспонат - определенное зашифрованное число. Решив уравнения и разгадав все числа, можно узнать две последние цифры года смерти художника.',
      type: 'puzzle',
      content: {
        image: '/quiz/images/puzzle3.jpeg',
      },
      answer: '1939 год',
    },

    {
      id: 14,
      title: 'Поздравляем!',
      description: 'Вы успешно прошли все задания квиза! Благодарим за участие!',
      type: 'congratulation',
      content: {
        image: '', // Можно добавить изображение, если нужно
      },
    },
  ])

  // Вычисляемое свойство для текущего задания
  const currentTask = computed(() => tasks.value[currentTaskIndex.value])

  // Функция для сброса локального состояния
  function resetLocalState() {
    showHint.value = false
    showAnswerLocal.value = false
    currentSlide.value = 0

    // Очищаем объекты, используя Object.keys для изменения содержимого, а не самих переменных
    Object.keys(selectedPrinciples).forEach((key) => {
      delete selectedPrinciples[key]
    })

    Object.keys(principleChecked).forEach((key) => {
      delete principleChecked[key]
    })
  }

  // Функция для перехода к следующему заданию
  function nextTask() {
    if (currentTaskIndex.value < tasks.value.length - 1) {
      // Добавляем текущее задание в список выполненных
      const task = currentTask.value
      if (task && !completedTasks.value.includes(task.id)) {
        completedTasks.value.push(task.id)
      }

      // Сбрасываем показ ответа и локальное состояние
      showAnswer.value = false
      resetLocalState()

      // Переходим к следующему заданию
      currentTaskIndex.value++

      // Сохраняем прогресс в localStorage
      saveProgress()
    }
  }

  // Функция для перехода к предыдущему заданию
  function prevTask() {
    if (currentTaskIndex.value > 0) {
      // Сбрасываем показ ответа и локальное состояние
      showAnswer.value = false
      resetLocalState()

      // Переходим к предыдущему заданию
      currentTaskIndex.value--
    }
  }

  // Функция для переключения показа ответа
  function toggleAnswer() {
    showAnswer.value = !showAnswer.value
  }

  // Функция для сохранения прогресса в localStorage
  function saveProgress() {
    localStorage.setItem(
      'taskProgress',
      JSON.stringify({
        currentTaskIndex: currentTaskIndex.value,
        completedTasks: completedTasks.value,
      }),
    )
  }

  // Функция для загрузки прогресса из localStorage
  function loadProgress() {
    const savedProgress = localStorage.getItem('taskProgress')
    if (savedProgress) {
      const progress = JSON.parse(savedProgress)
      currentTaskIndex.value = progress.currentTaskIndex
      completedTasks.value = progress.completedTasks
    }
  }

  function isPrincipleCorrect(text: string): boolean | null {
    // Ищем принцип в текущем задании
    const principle = currentTask.value?.content.principles?.find((p) => p.text === text)
    return principle ? principle.correct : null
  }

  // Загружаем прогресс при инициализации хранилища
  loadProgress()

  return {
    tasks,
    currentTask,
    currentTaskIndex,
    completedTasks,
    showAnswer,
    showHint,
    showAnswerLocal,
    currentSlide,
    selectedPrinciples,
    principleChecked,
    nextTask,
    prevTask,
    toggleAnswer,
    resetLocalState,
    saveProgress,
    loadProgress,
    isPrincipleCorrect,
  }
})
