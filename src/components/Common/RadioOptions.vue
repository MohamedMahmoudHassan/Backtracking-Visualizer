<template>
<div class="radio-options">

  <b-field :label="label + ':'" custom-class="is-primary" horizontal>
    <b-radio
      v-for="item in options"
      v-bind:key="item.id"
      :name="item.label"
      :natove-value="item.value"
      v-model="value"
    >
      {{ label }}
    </b-radio>
  </b-field>
</div> 
</template>

<script>
export default {
  props: ["label", "options", "value"],
};
</script>

<style>
.radio-options{
    color: blue;
    margin: 5px;
}
</style>