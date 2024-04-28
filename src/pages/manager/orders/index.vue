<template>
  <FixedLeftColumn sticky>
    <template #fixed>
      <Button
          class="button-back"
          color="gray"
          width="full"
        >
          <span>Назад</span>
      </Button>
      <div class="block">
        <InputDate
          v-model="dateRange"
          :range="true" 
          placeholder="Период" 
        />
        <Search 
          v-model:search-type="searchType"
          v-model:search-query="searchQuery"
          :search-types={...searchTypes} 
          :select-display-value="'icon'" 
        />
        <div class="block-toggle">
          <Toggle
            v-for="(item, i) in ToggleButton" 
            :key="i" 
            :color="'gray'"
            width="inline"
          >
            <i v-if="item.icon" class="icon icon_small" :class="item.icon" />
            <span v-if="item.text">{{ item.text }}</span>
          </Toggle>
        </div>
      </div>
      <div class="block">
        <Select 
          v-model="type"
          label="Год"
          :items="selectItems"
        />
        <div class="d-flex">
          <Button 
            v-for="(item, i) in button"
            :key="i"
            :color="item.color"
            :width="item.width"
          >
            <span>{{ item.text }}</span>
          </Button>
        </div>
        <span class="text-center text-10">
          Обычный вывод показывает 250 заказов, чтобы снять ограничение и показать до
          5000 заказов нужно выбрать год
        </span>
      </div>
    </template>
    <template #default>
      <slot name="card"/>
    </template>
  </FixedLeftColumn>
</template>

<script setup lang="ts">
import FixedLeftColumn from "~/shared/ui/templates/fixed-left-column.vue";
import InputDate from "~/shared/ui/inputs/input-date/index.vue";
import { Toggle } from "~/shared/ui/toggle";
import Search from "~/shared/ui/search/index.vue";
import { Select } from "~/shared/ui/select";
import Button from "~/shared/ui/button/index.vue";
import type { ButtonProps } from "~/shared/ui/button/types";

interface BurronMain extends ButtonProps {
  text: string;
}

const dateRange = ref();
const route = useRoute();
const type = ref();
const searchQuery = ref();
const searchType = ref('psid');

const selectItems = [
  {
    value: "2023",
  },
  {
    value: "2022",
  },
  {
    value: "2021",
  },

];
const searchTypes = {
  "psid": {
    title: "Номер фотосессии",
    placeholder: "Введите номер фотосессии",
  },
  "order_number": {
    title: "Номер заказа",
    placeholder: "Введите номер номер заказа",
  }, 
  "client_id": {
    title: "Клиент ID",
    placeholder: "Введите номер клиента",
  }, 
  "phone": {
    title: "Телефон",
    placeholder: "Введите номер телефона",
  }, 
  "email": {
    title: "Email",
    placeholder: "Введите номер email",
  }, 
  "payer": {
    title: "Плательщик, ребенок",
    placeholder: "Введите номер плательщик, ребенок",
  }, 
};
const ToggleButton = [
  {
    text: "Все",
  },
  {
    icon: "icon-crown",
  },
  {
    icon: "icon-thumbs-down",
  },
  {
    icon: "icon-thumbs-up",
  },
  {
    icon: "fa-cloud-upload-alt",
  },
  {
    icon: "icon-truck",
  },
  {
    icon: "icon-money-bill-alt",
  },
  {
    icon: "fa-ruble-sign",
  },
];
const button: BurronMain[] = [
  {
    color: "purple",
    text: "Показать",
    width: "full",
  },
  {
    color: "gray",
    text: "Сбросить",
    width: "full",
  }
];

function updateUrlQuery() {
  const queryParams: Record<string, string> = {
    search_type: searchType.value || '',
    search_value: searchQuery.value || '',
    data_start: '',
    data_finish: '',
    year: type.value || '',
  };

  if (Array.isArray(dateRange.value) && dateRange.value.length > 0) {
    queryParams.data_start = useDateFormat(dateRange.value[0], "YYYYMMDD").value;
  }

  if (Array.isArray(dateRange.value) && dateRange.value.length > 1) {
    queryParams.data_finish = useDateFormat(dateRange.value[1], "YYYYMMDD").value;
  }

  const filteredQueryParams = Object.fromEntries(
    Object.entries(queryParams).filter(([_, value]) => value !== '')
  );

  const queryString = new URLSearchParams(filteredQueryParams);

  const newUrl = `${route.path}&${queryString}`;

  if (route.fullPath !== newUrl) {
    window.history.pushState({}, '', newUrl);
  }
}


watch([type, searchQuery, searchType, dateRange], updateUrlQuery);
</script>

<style scoped lang="scss">
.d-flex {
  display: flex;
  gap: 15px;
}
.block {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 16px;
  margin-top: 15px;
  

  &-toggle {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }
}

.button-back {
  display: none;

  @include active-by("lg") { 
    display: block; 
  }
}
</style>
