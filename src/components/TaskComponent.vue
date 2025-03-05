<template>
  <div class="task-container" v-if="task">
    <!-- <div class="task-content"> -->
    <!-- Заголовок задания -->
    <h2 class="task-title q-mb-sm q-transition animate-fade text-weight-bold">
      <span>{{ task.title }}</span>
    </h2>

    <!-- Описание задания -->
    <p class="task-description q-mb-md q-transition animate-fade" v-if="task.description">
      {{ task.description }}
    </p>

    <!-- Поздравление и опрос для типа congratulation -->
    <div
      v-if="task.type === 'congratulation'"
      class="congratulations-container q-pa-md q-mb-lg rounded-borders text-center"
    >
      <p class="q-mb-lg">
        Пожалуйста, поделитесь своим мнением, пройдя небольшой опрос по ссылке ниже:
      </p>
      <q-btn
        color="orange"
        label="Пройти опрос"
        icon="poll"
        size="lg"
        target="_blank"
        href="https://forms.gle/vcJsyD8CLUSVp4xH6"
        class="q-py-sm"
      />
    </div>

    <!-- Содержимое задания в зависимости от типа -->
    <div
      v-if="task.type !== 'congratulation'"
      class="task-content q-mb-lg q-transition animate-slide-in-up"
    >
      <!-- Ребус -->
      <div v-if="task.type === 'puzzle' && task.content.image" class="puzzle-container">
        <q-img :src="task.content.image" alt="Ребус" class="full-width" />
      </div>

      <!-- Аудио -->
      <div v-else-if="task.type === 'audio' && task.content.audio" class="audio-container">
        <!-- <audio controls class="full-width">
            <source :src="task.content.audio" type="audio/mpeg" />
            Ваш браузер не поддерживает аудио элемент.
          </audio> -->
        <p class="text-caption q-mt-sm">{{ task.content.caption }}</p>
      </div>

      <!-- Азбука Морзе -->
      <div v-else-if="task.type === 'morse'" class="morse-container">
        <q-img :src="task.content.image" alt="Азбука Морзе" class="full-width q-mb-md" />
        <div class="morse-code q-py-md bg-grey-2 rounded-borders">
          <q-img :src="task.content.code" alt="Азбука Морзе" class="full-width" />
        </div>
      </div>

      <!-- Загадка -->
      <div v-else-if="task.type === 'riddle'" class="riddle-container">
        <q-card class="content-card">
          <q-card-section>
            <pre class="riddle-text">{{ task.content.riddle }}</pre>
          </q-card-section>
        </q-card>
      </div>

      <!-- Кроссворд -->
      <div
        v-else-if="task.type === 'crossword' && task.content.crossword"
        class="crossword-container"
      >
        <!-- Подсказки для кроссворда -->
        <div class="crossword-clues q-mb-md">
          <h4>По вертикали:</h4>
          <div
            v-for="clue in task.content.crossword.vertical"
            :key="'v-' + clue.number"
            class="q-mb-sm crossword-clue"
          >
            <span class="text-weight-bold">{{ clue.number }}:</span>
            <div class="crossword-clue-images">
              <q-img
                v-for="(img, imgIndex) in clue.clue"
                :key="'v-' + clue.number + '-' + imgIndex"
                :src="img.src"
                :alt="img.alt"
                class="crossword-clue-image"
                width="48px"
                height="48px"
              />
            </div>
          </div>

          <h4 class="q-mt-md">По горизонтали:</h4>
          <div
            v-for="clue in task.content.crossword.horizontal"
            :key="'h-' + clue.number"
            class="q-mb-sm crossword-clue"
          >
            <span class="text-weight-bold">{{ clue.number }}:</span>
            <div class="crossword-clue-images">
              <q-img
                v-for="(img, imgIndex) in clue.clue"
                :key="'h-' + clue.number + '-' + imgIndex"
                :src="img.src"
                :alt="img.alt"
                class="crossword-clue-image"
                width="48px"
                height="48px"
              />
            </div>
          </div>
        </div>

        <!-- Изображение пустого кроссворда -->
        <div v-if="task.content.crossword.image" class="crossword-image q-mb-md">
          <q-img
            :src="task.content.crossword.image"
            alt="Кроссворд"
            class="full-width"
            fit="contain"
            style="max-height: 400px"
          />
        </div>
      </div>

      <!-- Шифр Цезаря -->
      <div v-else-if="task.type === 'cipher'" class="cipher-container">
        <q-card class="content-card q-mb-md">
          <q-card-section class="text-center text-weight-bold">
            {{ task.content.cipher }}
          </q-card-section>
        </q-card>
        <q-expansion-item
          label="Описание шифра"
          expand-icon-class="text-grey-8"
          class="content-card bg-white"
        >
          <q-card class="content-card bg-white">
            <q-card-section>
              <p>{{ task.content.explanation }}</p>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </div>

      <!-- Принципы -->
      <div
        v-else-if="task.type === 'principles' && task.content.principles"
        class="principles-container"
      >
        <!-- Карточки принципов -->
        <div class="principles-cards">
          <q-card
            v-for="(principle, index) in task.content.principles"
            :key="index"
            class="principle-card q-mb-sm"
            :class="{
              'principle-selected': taskStore.principleChecked[principle.text],
              'principle-correct':
                taskStore.principleChecked[principle.text] &&
                taskStore.selectedPrinciples[principle.text] === principle.correct,
              'principle-incorrect':
                taskStore.principleChecked[principle.text] &&
                taskStore.selectedPrinciples[principle.text] !== principle.correct,
            }"
          >
            <q-card-section>
              <div class="row justify-between items-start">
                <div class="col principle-text">{{ principle.text }}</div>
                <div
                  v-if="taskStore.principleChecked[principle.text]"
                  class="q-ml-sm principle-icon"
                >
                  <q-icon
                    :name="
                      taskStore.selectedPrinciples[principle.text] === principle.correct
                        ? 'check_circle'
                        : 'cancel'
                    "
                    :class="
                      taskStore.selectedPrinciples[principle.text] === principle.correct
                        ? 'text-positive'
                        : 'text-negative'
                    "
                    size="24px"
                  />
                </div>
              </div>
              <div class="principle-actions row justify-end q-gutter-sm q-mt-sm">
                <q-btn
                  label="Верно"
                  color="positive"
                  :outline="
                    !taskStore.selectedPrinciples[principle.text] ||
                    taskStore.selectedPrinciples[principle.text] !== true
                  "
                  @click="selectPrinciple(principle.text, true)"
                  :disable="taskStore.principleChecked[principle.text]"
                  :class="{
                    'opacity-0':
                      taskStore.principleChecked[principle.text] &&
                      taskStore.selectedPrinciples[principle.text] === false,
                  }"
                />
                <q-btn
                  label="Неверно"
                  color="negative"
                  :outline="
                    !taskStore.selectedPrinciples[principle.text] ||
                    taskStore.selectedPrinciples[principle.text] !== false
                  "
                  @click="selectPrinciple(principle.text, false)"
                  :disable="taskStore.principleChecked[principle.text]"
                  :class="{
                    'opacity-0':
                      taskStore.principleChecked[principle.text] &&
                      taskStore.selectedPrinciples[principle.text] === true,
                  }"
                />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <!-- Воспоминания -->
      <div v-else-if="task.type === 'memory'" class="memories-container">
        <div v-for="(memory, index) in task.content.memories" :key="index" class="q-mb-lg">
          <q-expansion-item
            :label="memory.title"
            header-class="bg-orange-1"
            expand-icon-class="text-grey-8"
            class="content-card"
            :default-opened="memory.defaultExpanded"
          >
            <q-card class="content-card no-shadow">
              <q-card-section>
                <div class="memory-text">
                  <p class="text-italic">{{ memory.text }}</p>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </div>
        <!-- Добавляем карусель с изображениями -->
        <div v-if="task.images && task.images.length > 0" class="memory-images q-mt-md">
          <q-carousel
            v-model="taskStore.currentSlide"
            transition-prev="slide-right"
            transition-next="slide-left"
            swipeable
            animated
            control-color="primary"
            navigation
            padding
            arrows
            height="400px"
            class="bg-white shadow-1 rounded-borders"
          >
            <q-carousel-slide
              v-for="(image, index) in task.images"
              :key="index"
              :name="index"
              style="padding-left: 16px; padding-right: 16px"
              class="column no-wrap flex-center"
            >
              <q-img :src="image.src" :ratio="16 / 9" fit="contain" style="height: 400px" />
              <div class="q-mt-md text-center">{{ image.title }}</div>
            </q-carousel-slide>
          </q-carousel>
        </div>
      </div>
    </div>

    <!-- Подсказка (если есть) -->
    <div
      v-if="task.content && task.content.hint && task.type !== 'congratulation'"
      class="hint-container q-mb-md"
    >
      <q-btn
        label="Подсказка"
        color="warning"
        outline
        class="full-width"
        @click="taskStore.showHint = !taskStore.showHint"
      />
      <q-slide-transition>
        <div v-show="taskStore.showHint" class="bg-orange-1 rounded-borders q-pa-md q-mt-sm">
          <p>{{ task.content.hint }}</p>
          <q-img
            v-if="task.content.hintImage"
            :src="task.content.hintImage"
            class="full-width q-mt-md"
            fit="contain"
            style="max-height: 300px"
          />
        </div>
      </q-slide-transition>
    </div>
    <!-- </div> -->
    <!-- Общий блок ответа -->
    <div
      v-if="task.answer && task.type !== 'principles' && task.type !== 'congratulation'"
      class="answer-container q-mb-md"
    >
      <q-btn
        label="Ответ"
        color="primary"
        outline
        class="full-width text-weight-medium"
        @click="taskStore.showAnswerLocal = !taskStore.showAnswerLocal"
      />
      <q-slide-transition>
        <div v-show="taskStore.showAnswerLocal" class="bg-blue-1 rounded-borders q-pa-md q-mt-sm">
          <div class="text-weight-medium">{{ task.answer }}</div>

          <!-- Изображение решенного кроссворда -->
          <div
            v-if="task.type === 'crossword' && task.content.crossword?.solvedImage"
            class="solved-crossword q-mt-md"
          >
            <q-img
              :src="task.content.crossword.solvedImage"
              alt="Решенный кроссворд"
              class="full-width"
              fit="contain"
              style="max-height: 400px"
            />
          </div>

          <!-- Изображения в ответе (если есть) -->
          <div v-else-if="task.images && task.images.length > 0" class="answer-images">
            <q-carousel
              v-model="taskStore.currentSlide"
              transition-prev="slide-right"
              transition-next="slide-left"
              swipeable
              animated
              control-color="primary"
              navigation
              padding
              arrows
              height="400px"
              class="bg-white shadow-1 rounded-borders"
            >
              <q-carousel-slide
                v-for="(image, index) in task.images"
                :key="index"
                :name="index"
                style="padding-left: 16px; padding-right: 16px"
                class="column no-wrap flex-center"
              >
                <q-img :src="image.src" :ratio="16 / 9" fit="contain" style="height: 400px" />
                <div class="q-mt-md text-center">{{ image.title }}</div>
              </q-carousel-slide>
            </q-carousel>
          </div>
        </div>
      </q-slide-transition>
    </div>

    <!-- Воспоминание (если есть) -->
    <div v-if="task.memory && task.type !== 'congratulation'" class="memory-container q-mb-md">
      <q-expansion-item
        label="Воспоминание"
        header-class="bg-orange-1"
        expand-icon-class="text-grey-8"
        class="content-card"
      >
        <q-card class="content-card no-shadow">
          <q-card-section>
            <div class="memory-text">
              <p class="text-italic">{{ task.memory }}</p>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTaskStore } from 'src/stores/task-store'

// Получаем хранилище заданий
const taskStore = useTaskStore()

// Вычисляемые свойства
const task = computed(() => taskStore.currentTask)

// Обновленная функция для выбора принципа
function selectPrinciple(text: string, verdict: boolean) {
  taskStore.selectedPrinciples[text] = verdict
  taskStore.principleChecked[text] = true
}
</script>

<style lang="scss" scoped>
.task-container {
  max-width: 600px;

  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.brodsky-image {
  max-width: 200px;
  margin: 0 auto;
}

.task-title {
  text-align: center;
  font-size: 1.5rem;
}

.underline {
  text-decoration: underline;
}

.riddle-text {
  white-space: pre-wrap;
  font-family: inherit;
  margin: 0;
}

.memory-text {
  font-style: italic;
}

.principles-table {
  .q-table__card {
    box-shadow: none;
  }
}

// Анимации
.q-transition {
  transition: all 0.3s ease;
}

.animate-fade {
  animation: fadeIn 0.5s;
}

.animate-slide-in-up {
  animation: slideInUp 0.5s;
}

// Адаптивность для мобильных устройств
@media (max-width: 599px) {
  .task-container {
  }

  .task-title {
    font-size: 1.2rem;
  }

  .brodsky-image {
    max-width: 150px;
  }
}

.content-card {
  background: #fff3e0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &.no-shadow {
    box-shadow: none;
    background: transparent;
  }
}

.memory-text {
  font-style: italic;
  line-height: 1.6;
}

.riddle-text {
  white-space: pre-wrap;
  font-family: inherit;
  margin: 0;
  line-height: 1.6;
}

.memory-card {
  transition: box-shadow 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.crossword-container {
  .crossword-image,
  .solved-crossword {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .crossword-clues {
    background: #fff;
    padding: 16px;
    border-radius: 8px;

    h4 {
      margin-top: 0;
      margin-bottom: 12px;
      color: #795548;
    }
  }

  .crossword-clue {
    display: flex;
    align-items: center;
    gap: 8px;

    .crossword-clue-images {
      display: flex;
      gap: 4px;
      align-items: center;
    }

    .crossword-clue-image {
      border-radius: 4px;
      overflow: hidden;
    }
  }
}

.principles-container {
  .principle-card {
    background: white;
    transition: all 0.3s ease;
    border-left: 4px solid #eeeeee; // Серая полоска слева по умолчанию
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 12px;

    &.principle-correct {
      border-left: 4px solid #21ba45; // Зеленая полоска для правильных ответов
    }

    &.principle-incorrect {
      border-left: 4px solid #c10015; // Красная полоска для неправильных ответов
    }
  }

  .principle-text {
    line-height: 1.5;
  }

  .principle-icon {
    transition: all 0.3s ease;
  }

  .opacity-0 {
    opacity: 0;
    pointer-events: none;
  }
}

.congratulations-container {
  animation: fadeIn 0.8s;

  h3 {
    color: #2e7d32;
    font-size: 1.8rem;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.5;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideInUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
