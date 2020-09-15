<template>
  <div class="columns h-100 m-0">
    <div class="column is-three-quarters father">
      <div class="columns columns-inner content">
        <div class="column is-full">
          <div class="columns">
            <div class="column is-full p-logo allignStart">
              <img src="../assets/images/TBDC-logo.svg" />
            </div>
          </div>

          <div class="columns">
            <div class="column is-half allignStart">
              <h1 class="text-title" v-if="step === 0">Informações básicas</h1>
              <h1 class="text-title" v-if="step === 1">Tipo de plano</h1>
              <h1 class="text-title" v-if="step === 2">{{planType.name || "Evento"}}</h1>
            </div>
            <div class="column is-half allignEnd">
              <b-tag class="tag-step" size="is-medium">Passo {{step + 1}} de 3</b-tag>
            </div>
          </div>
          <div v-if="step === 0">
            <div class="columns">
              <div class="column is-three-quarters">
                <b-field label="Descrição">
                  <b-input v-model="description" placeholder="Informe"></b-input>
                </b-field>
              </div>
              <div class="column is-one-quarter">
                <b-field label="Safra">
                  <b-select expanded v-model="safra" placeholder="Selecione">
                    <option
                      v-for="option in safraData"
                      :value="option.id"
                      :key="option.id"
                    >{{ option.name }}</option>
                  </b-select>
                </b-field>
              </div>
            </div>

            <div class="columns">
              <div class="column is-half">
                <b-field label="Informe o Produtor">
                  <b-select v-model="producer" expanded placeholder="Selecione">
                    <option
                      v-for="option in producerData"
                      :value="option.id"
                      :key="option.id"
                    >{{ option.name }}</option>
                  </b-select>
                </b-field>
              </div>
              <div class="column is-half">
                <b-field label="Informe o AT">
                  <b-select v-model="at" expanded placeholder="Selecione">
                    <option
                      v-for="option in atData"
                      :value="option.id"
                      :key="option.id"
                    >{{ option.name }}</option>
                  </b-select>
                </b-field>
              </div>
            </div>
          </div>
          <div v-if="step === 1">
            <div class="columns">
              <div class="column">
                <h6 class="title is-6">Selecione o tipo de plano</h6>
              </div>
            </div>
            <div class="columns">
              <div class="column allignStart">
                <div class="field is-grouped">
                  <button
                    class="button is-link buttonPlan is-outlined"
                    :class="{'planTypeActive': planType.value === 0}"
                    @click="setPlanType(0)"
                  >Ensaio</button>
                  <button
                    class="button is-link buttonPlan is-outlined"
                    :class="{'planTypeActive': planType.value === 1}"
                    @click="setPlanType(1)"
                  >Visita Técnica</button>
                  <button
                    class="button is-link buttonPlan is-outlined"
                    :class="{'planTypeActive': planType.value === 2}"
                    @click="setPlanType(2)"
                  >Evento</button>
                </div>
              </div>
            </div>
          </div>
          <div v-if="step === 2">
            <div class="columns">
              <div class="column pt-0">
                <b-datepicker
                  v-model="date"
                  size="is-medium"
                  inline
                  icon-prev="chevron-up"
                  icon-next="chevron-down"
                  class="datepicker-container"
                >
                  <template slot="header">
                    <b-field>
                      <div class="columns allignCenter">
                        <div class="column">
                          <p class="control text-datepicker">
                            <span>{{date.toLocaleString('default', { month: 'long' }) + "/"}}</span>
                            <span class>{{ date.getFullYear() }}</span>
                          </p>
                        </div>
                        <div class="column barDatePicker"></div>
                        <div class="column">
                          <div class="columns">
                            <div class="column is-6 is-offset-2 allignEnd p-0">
                              <b-button
                                size="is-medium"
                                class="datepicker-button"
                                @click="prevMonth()"
                              >
                                <b-icon
                                  icon="chevron-up"
                                  size="is-medium"
                                  type="is-light"
                                  class="chevron arrow-date-picker"
                                />
                              </b-button>
                            </div>
                            <div class="column allignStart">
                              <b-button
                                size="is-medium"
                                class="datepicker-button"
                                @click="nextMonth()"
                              >
                                <b-icon
                                  icon="chevron-down"
                                  size="is-medium"
                                  type="is-light"
                                  class="chevron arrow-date-picker"
                                  @click="nextMonth()"
                                />
                              </b-button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </b-field>
                  </template>
                </b-datepicker>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="columns to-bottom is-multiline end">
        <div class="column is-full p-footer">
          <b-progress size="is-small" :value="progressBar" class="progress-bar"></b-progress>
        </div>
        <div
          class="column is-full column-footer-button"
          :class="{'allignBetween': step > 0, 'allignEnd': step === 0 }"
        >
          <b-button type="is-primary  prev-button" size="is-large" v-if="step > 0" @click="prev()">
            <p class="text-button">Voltar</p>
            <b-icon
              icon="chevron-left"
              size="is-small"
              type="is-white"
              class="chevron prev-button"
            />
          </b-button>
          <b-button type="is-primary button-next" size="is-large" @click="next()">
            <p class="text-button" v-if="step < 2" :disabled="disabledFunc()">Próximo</p>
            <p class="text-button" v-if="step === 2">Concluir</p>
            <b-icon
              icon="chevron-right"
              size="is-small"
              type="is-white"
              class="chevron"
              v-if="step < 2"
            />
            <b-icon icon="check" size="is-small" type="is-white" class="chevron" v-if="step === 2" />
          </b-button>
        </div>
      </div>
    </div>

    <div class="column is-one-quarter p-0 h-100">
      <figure class="image img-gradient">
        <b-icon icon="close" size="is-medium" type="is-white" class="close-icon" />
        <img src="../assets/images/placeholder-right.png" alt="Placeholder image" class />
        <p class="text-image">
          Tecnologia a favor
          <br />do homem do campo.
        </p>
      </figure>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: new Date(),
      progressBar: 33,
      step: 2,
      description: "",
      safra: "",
      producer: "",
      at: "",
      planType: -1,
      safraData: [
        { name: "2020", id: 0 },
        { name: "2019", id: 1 },
        { name: "2018", id: 2 },
        { name: "2017", id: 3 },
      ],
      producerData: [
        { name: "José", id: 0 },
        { name: "Mario", id: 1 },
        { name: "Antônio", id: 2 },
        { name: "João", id: 3 },
      ],
      atData: [
        { name: "Cleide", id: 0 },
        { name: "Sônia", id: 1 },
        { name: "Raimundo", id: 2 },
        { name: "Otilia", id: 3 },
      ],
      months: [
        { name: "Janeiro", value: 0 },
        { name: "Fevereiro", value: 1 },
        { name: "março", value: 2 },
        { name: "Abril", value: 3 },
        { name: "Maio", value: 4 },
        { name: "Junho", value: 5 },
        { name: "Julho", value: 6 },
        { name: "Agosto", value: 7 },
        { name: "Setembro", value: 8 },
        { name: "Outubro", value: 9 },
        { name: "Novembro", value: 10 },
        { name: "Dezembro", value: 11 },
      ],
    };
  },
  methods: {
    prevMonth() {
      this.date = new Date(this.date);
      this.date.setMonth(this.date.getMonth() - 1);
    },
    nextMonth() {
      this.date = new Date(this.date);
      this.date.setMonth(this.date.getMonth() + 1);
    },
    disabledFunc() {
      if (this.step === 0) {
        if (
          this.description === "" &&
          this.safra === "" &&
          this.producer === "" &&
          this.at === ""
        ) {
          return true;
        } else {
          return false;
        }
      } else if (this.step === 1) {
        if (this.planType === -1) {
          return true;
        } else {
          return false;
        }
      }
    },
    prev() {
      this.step = this.step - 1;
      this.progressBar = this.progressBar - 33;
    },
    next() {
      if (this.step < 1) {
        this.step = this.step + 1;
        this.progressBar = this.progressBar + 33;
      } else if (this.step === 1) {
        this.step = this.step + 1;
        this.progressBar = 100;
      } else {
        this.step = 0;
        this.progressBar = 33;
      }
    },
    setPlanType(value) {
      if (value === 0) {
        this.planType = { name: "Ensaio", value: value };
      } else if (value === 1) {
        this.planType = { name: "Visita Técnica", value: value };
      } else {
        this.planType = { name: "Evento", value: value };
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.father {
  display: flex;
  flex-direction: column;
  padding-left: 0;
  .content {
    flex: 1 0 auto;
  }
  .end {
    flex-shrink: 0;
  }
}

.buttonPlan {
  background-color: transparent !important;
  border-color: #0050a0 !important;
  color: #354052 !important;
  border-radius: 10px !important;
  padding: 1rem;
  height: 8rem;
  font-weight: 500;
  margin-right: 0.5rem;
  width: 8rem;
  white-space: break-spaces;
}

.buttonPlan:hover,
.planTypeActive {
  background: #0050a0 !important;
  color: #ffffff !important;
  font-weight: bold !important;
}

.tag-step {
  padding-left: 1.2em;
  padding-right: 1.2em;
  height: 2.7rem;
  font-size: 14px !important;
  font-weight: 600;
}

.is-three-quarters {
  width: 72% !important;
}
.is-one-quarter {
  width: 28% !important;
}

.text-button {
  font-size: 14px !important;
}

.column-footer-button {
  padding-right: 0 !important;
  padding-bottom: 0 !important;
  padding-top: 0;
  background-color: #f5f5fb;
  height: 4.5rem;
  font-weight: bold;
}
.progress-bar {
  height: 6px !important;
}
.p-logo {
  padding-top: 1.5rem;
  height: 5rem;
  img {
    height: 100%;
  }
}
.p-footer {
  padding-right: 0 !important;
  padding-bottom: 0 !important;
}

.columns-inner {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.img-gradient:after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: inline-block;
  background: linear-gradient(180deg, rgba(0, 80, 160, 0) 0%, #093664 100%);
}
.img-gradient img {
  display: block;
  height: 100vh;
  width: 100%;
}

.text-image {
  position: absolute;
  top: 90%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 40px;
  color: #ffffff;
  width: 100%;
  z-index: 100;
  text-align: initial;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-icon {
  position: absolute;
  top: 5%;
  right: 8%;
  z-index: 100;
  cursor: pointer;
}

.text-title {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 39px;
  color: #0050a0;
}

.button-next {
  background-color: #48b8aa !important;
  border-radius: 0;
  height: 100%;
  width: 12rem;
  font-weight: bold;

  :first-child {
    display: contents !important;
  }
}

.button-align {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.chevron {
  margin-top: 0.3em;
}

.prev-button {
  background-color: #b7c0cd !important;
  border-radius: 0;
  height: 100%;
  width: 12rem;
  font-weight: bold;

  :first-child {
    display: contents !important;
  }
}

.barDatePicker {
  border-bottom: 1px solid #dbdbdb;
  padding-bottom: 0;
  padding-top: 0;
}
.arrow-date-picker {
  color: #92929d !important;
}

.datepicker-button {
  border-radius: 10.9527px !important;
  height: 2.7rem;
  width: 1rem;
}

.text-datepicker {
  font-weight: 600;
  font-size: 25px;
}
.datepicker-container {
  border: 1px solid #b7c0cd;
  border-radius: 10px;
}

.datepicker.is-medium {
  font-size: 1.2rem !important;
}
</style>