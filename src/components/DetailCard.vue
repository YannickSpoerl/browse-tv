<template>
  <q-card dark style="width: 100%; padding: 10px" bordered>
    <div class="text-center">
      <p class="text-h4">
        {{ el.title }}
      </p>
    </div>
    <div v-if="el.tagline" class="text-center">
      <p class="text-italic">"{{ el.tagline }}"</p>
    </div>
    <q-card-section horizontal style="height: 100%">
      <q-img
        spinner-color="accent"
        :alt="el.title + ' cover image'"
        class="col"
        style="height: 70%; margin: auto"
        fit="scale-down"
        :src="el.image"
      />
      <q-card-section class="col">
        <q-list dark separator>
          <q-item v-if="el.type">
            <q-item-section avatar>
              <q-icon size="3em" name="tv" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{
                el.type == 'Movie' ? 'Movie' : 'TV-Show'
              }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="el.year">
            <q-item-section avatar>
              <q-icon size="3em" name="event" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ el.year }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="el.runtimeStr">
            <q-item-section avatar>
              <q-icon size="3em" name="timelapse" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ el.runtimeStr }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="el.tvSeriesInfo && el.tvSeriesInfo.seasons">
            <q-item-section avatar>
              <q-icon size="3em" name="fa-solid fa-hashtag" />
            </q-item-section>
            <q-item-section>
              <q-item-label>
                {{
                  el.tvSeriesInfo.seasons[el.tvSeriesInfo.seasons.length - 1]
                }}
                seasons</q-item-label
              >
            </q-item-section>
          </q-item>
          <q-item v-if="el.imDbRating">
            <q-item-section avatar>
              <q-icon size="3em" name="fa-solid fa-star-half-stroke" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ el.imDbRating }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="el.genreList">
            <q-item-section avatar>
              <q-icon size="3em" name="category" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{
                el.genreList
                  .map((el) => {
                    return ' ' + el.key;
                  })
                  .toString()
              }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            clickable
            target="_blank"
            :href="'https://imdb.com/title/' + el.id"
          >
            <q-item-section avatar>
              <q-icon size="3em" name="fa-brands fa-imdb" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Check on IMDB.com</q-item-label>
            </q-item-section>
          </q-item>
          <div class="text-center">
            <q-btn
              v-if="isPlayable"
              icon="play_arrow"
              label="Play movie"
              color="accent"
              @click="playItem(el)"
              style="margin-top: 10px"
            />
          </div>
        </q-list>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { Item } from './models';
import { remotePlayService } from 'src/services';

export default defineComponent({
  name: 'AboutCard',
  props: {
    showBanner: {
      type: Boolean,
      required: false,
      default: true,
    },
    showDescription: {
      type: Boolean,
      required: false,
      default: true,
    },
    el: {
      type: Object as PropType<Item>,
      required: true,
    },
  },
  setup(props) {
    let isPlayable = ref(false);

    remotePlayService.checkPlayable(props.el).then((result: boolean) => {
      isPlayable.value = result;
    });

    function playItem(item: Item): void {
      remotePlayService.playItem(item);
    }

    return {
      isPlayable,
      playItem,
    };
  },
});
</script>
<style lang="scss"></style>
