<template>
  <div>
    <container title="Default slot with text">
      <!-- old -->
      <foo>
        <template slot-scope="{ msg }">
          old1 : {{ msg }}
        </template>
      </foo>

      <!-- new -->
      <foo v-slot="{ msg }">
        new : {{ msg }}
      </foo>

      <!-- 有问题 -->
      <!-- <foo slot-scope="{ msg }">
        old2 : {{ msg }}
      </foo> -->
    </container>
    <container title="Nested default slots">
      <!-- old -->
      <foo>
        <bar slot-scope="foo">
          <baz slot-scope="bar">
            <template slot-scope="baz">
              {{ foo }} {{ bar }} {{ baz }}
            </template>
          </baz>
        </bar>
      </foo>

      <!-- new -->
      <foo v-slot="foo">
        <bar v-slot="bar">
          <baz v-slot="baz">
            {{ foo }} {{ bar }} {{ baz }}
          </baz>
        </bar>
      </foo>
    </container>
    <container title="Named slots">
      <!-- old -->
      <foo>
        <template
          slot="one"
          slot-scope="{ msg }"
        >
          text slot: {{ msg }}
        </template>

        <div
          slot="two"
          slot-scope="{ msg }"
        >
          element slot: {{ msg }}
        </div>
      </foo>

      <!-- new -->
      <foo>
        <template v-slot:one="{ msg }">
          text slot: {{ msg }}
        </template>

        <template v-slot:two="{ msg }">
          <div>
            element slot: {{ msg }}
          </div>
        </template>
      </foo>
    </container>
  </div>
</template>
<script>
import foo from './foo'
import bar from './bar'
import baz from './baz'
import container from '../container'
export default {
  components: {
    foo,
    bar,
    baz,
    container
  }
}
</script>
