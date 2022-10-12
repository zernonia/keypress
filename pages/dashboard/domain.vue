<script setup lang="ts">
const profile = useProfile()

const payload = ref({ subdomain: profile.value.subdomain })
const isSaving = ref(false)
const { save } = useProfileSave(payload)
const saveDomain = async () => {
  // validate here
  try {
    isSaving.value = true

    // add domain and check first
    const data = await $fetch("/api/add-domain", {
      method: "POST",
      body: {
        domain: payload.value.subdomain,
      },
    })
    console.log(data)

    await Promise.all([save(), checkDomain()])
  } catch (err) {
    console.log(err)
  } finally {
    isSaving.value = false
  }
}

const isCheckingDomain = ref(false)
const isValid = ref(false)
const checkDomain = async () => {
  isCheckingDomain.value = true
  const { valid } = await $fetch("/api/check-domain", {
    method: "POST",
    body: {
      domain: payload.value.subdomain,
    },
  })
  isValid.value = valid
  isCheckingDomain.value = false
}

onMounted(() => {
  if (profile.value.domains.active) {
    isValid.value = true
  } else if (!payload.value.subdomain) {
    isValid.value = false
  } else {
    checkDomain()
  }
})
</script>

<template>
  <div class="w-full">
    <div class="flex w-full justify-end">
      <Button :loading="isSaving" @click="saveDomain" class="mb-8 btn-primary"
        >Save <span class="ml-2">⌘S</span></Button
      >
    </div>

    <div class="flex items-center">
      <label for="domain" class="flex-shrink-0 mr-2">Domain :</label>
      <input
        type="text"
        name="domain"
        id="domain"
        class="bg-white"
        v-model="payload.subdomain"
        placeholder="https://foo.bar.com"
      />
    </div>

    <div v-if="!isValid && payload.subdomain">
      <Button :loading="isCheckingDomain" class="btn-plain mt-12" @click="checkDomain">Check domain</Button>

      <div class="mt-4 bg-white p-6 rounded-2xl">
        <p>Set the following record on your DNS provider to continue:</p>

        <div class="mt-6 flex items-center space-x-6">
          <div class="flex-shrink-0 justify-start">
            <p>Type</p>
            <p>CNAME</p>
          </div>
          <div class="flex-shrink-0">
            <p>Name</p>
            <p>{{ payload.subdomain.split(".")[0] }}</p>
          </div>
          <div class="flex-grow">
            <p>Value</p>
            <p>cname.vercel-dns.com</p>
          </div>
        </div>

        <div class="mt-4 text-sm text-gray-400">
          Depending on your provider, it might take some time for the changes to apply.

          <NuxtLink target="_blank" to="https://vercel.com/guides/why-is-my-vercel-domain-unverified"
            >Learn More</NuxtLink
          >
        </div>
      </div>
    </div>
  </div>
</template>
