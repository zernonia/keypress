<script lang="ts" setup>
import { Command } from "vue-command-palette"

const router = useRouter()
const user = useSupabaseUser()
const subdomain = useSubdomain()
const url = useUrl()

const keys = useMagicKeys()
const CmdK = keys["Meta+K"]
const Escape = keys["Escape"]
const isVisible = useState("command-visible", () => false)

watch(CmdK, (v) => {
  if (v) {
    isVisible.value = !isVisible.value
    // console.log("Meta + K has been pressed")
    // do your own logic, maybe make dialog visible
  }
})
watch(Escape, () => (isVisible.value = false))

const handleSelectItem = (item: { key: string; value: string }) => {
  console.log(item)
}

const navAction = (path: string) => {
  isVisible.value = false
  router.push(path)
}
const navList = computed(() =>
  subdomain.value
    ? [
        { label: "Home", value: "home", action: () => navAction("/"), show: true },
        {
          label: "Write",
          value: "write",
          action: () => (window.location.href = url + "/write"),
          show: true,
        },
        {
          label: "KeyPress",
          value: "keypress",
          action: () => (window.location.href = url),
          show: true,
        },
      ]
    : [
        { label: "Home", value: "home", action: () => navAction("/"), show: true },
        { label: "Write", value: "write", action: () => navAction("/write"), show: true },
        { label: "Posts", value: "posts", action: () => navAction("/posts"), show: true },
        { label: "Login", value: "login", action: () => navAction("/login"), show: !user.value?.id },
        { label: "Dashboard", value: "dashboard", action: () => navAction("/dashboard"), show: user.value?.id },
      ]
)
</script>

<template>
  <div>
    <button class="btn-plain" @click="isVisible = true">⌘K</button>
    <Command.Dialog :visible="isVisible" theme="kbar" @select-item="handleSelectItem">
      <template #header>
        <div command-kbar-top-shine="" />
        <Command.Input placeholder="Search for commands..." />
        <hr command-kbar-loader="" />
      </template>
      <template #body>
        <!-- <Command.Loading> Hang on... </Command.Loading> -->
        <Command.List ref="dialogRef">
          <Command.Empty>No results found.</Command.Empty>

          <Command.Group heading="Navigation">
            <Command.Item @select="item.action" v-for="item in navList.filter((i) => i.show)" :data-value="item.value">
              {{ item.label }}
            </Command.Item>
          </Command.Group>

          <!-- <Command.Item>Apple</Command.Item> -->
        </Command.List>
      </template>
      <template #footer>
        <!-- <button command-kbar-open-trigger="">
          Open Application
          <kbd>↵</kbd>
        </button> -->

        <hr />
        <button command-kbar-subcommand-trigger="">
          Actions
          <kbd>⌘</kbd>
          <kbd>K</kbd>
        </button>
      </template>
    </Command.Dialog>
  </div>
</template>

<style>
.kbar {
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 200;
}

.kbar [command-dialog-wrapper] {
  margin: 20vh auto auto;
  width: 100%;
  border-radius: 12px;
  padding: 8px 0;
  @apply bg-white shadow-lg relative max-w-screen-sm;
}

.kbar [command-input] {
  border: none;
  width: 100%;
  font-size: 15px;
  padding: 8px 16px;
  outline: none;
  background: var(--bg);
  color: var(--gray12);
  @apply focus-within:!ring-transparent;
}
.kbar [command-input]::placeholder {
  @apply text-gray-400;
}
.kbar [command-kbar-loader] {
  --loader-color: var(--gray9);
  border: 0;
  width: 100%;
  width: 100%;
  left: 0;
  height: 1px;
  background: var(--gray6);
  position: relative;
  overflow: visible;
  display: block;
  margin-top: 12px;
  margin-bottom: 12px;
}
.kbar [command-kbar-loader]:after {
  content: "";
  width: 50%;
  height: 1px;
  position: absolute;
  background: linear-gradient(90deg, transparent 0%, var(--loader-color) 50%, transparent 100%);
  top: -1px;
  opacity: 0;
  animation-duration: 1.5s;
  animation-delay: 1s;
  animation-timing-function: ease;
  animation-name: loading;
}
.kbar [command-item] {
  content-visibility: auto;
  cursor: pointer;
  height: 40px;
  border-radius: 8px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 8px;
  color: var(--gray12);
  user-select: none;

  @apply bg-white hover:bg-light-300 transition;
}
.kbar [command-item][aria-selected="true"] {
  @apply bg-light-300;
}
.kbar [command-item][aria-disabled="true"] {
  color: var(--gray8);
  cursor: not-allowed;
}
.kbar [command-item]:active {
  transition-property: background;
  background: var(--gray4);
}
.kbar [command-item]:first-child {
  margin-top: 8px;
}
.kbar [command-item] + [command-item] {
  margin-top: 4px;
}
.kbar [command-item] svg {
  width: 18px;
  height: 18px;
}
.kbar [command-kbar-meta] {
  margin-left: auto;
  color: var(--gray11);
  font-size: 13px;
}
.kbar [command-list] {
  padding: 0 8px;
  height: var(--cmd-list-height);
  overflow: auto;
  overscroll-behavior: contain;
  scroll-padding-block-end: 48px;
  transition: 100ms ease;
  transition-property: height;
  padding-bottom: 40px;
}
.kbar [command-kbar-open-trigger],
.kbar [command-kbar-subcommand-trigger] {
  color: var(--gray11);
  padding: 0px 4px 0px 8px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 12px;
  height: 28px;
  letter-spacing: -0.25px;
}
.kbar [command-kbar-clipboard-icon],
.kbar [command-kbar-hammer-icon] {
  width: 20px;
  height: 20px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}
.kbar [command-kbar-clipboard-icon] svg,
.kbar [command-kbar-hammer-icon] svg {
  width: 14px;
  height: 14px;
}
.kbar [command-kbar-clipboard-icon] {
  background: linear-gradient(to bottom, #f55354, #eb4646);
}
.kbar [command-kbar-hammer-icon] {
  background: linear-gradient(to bottom, #6cb9a3, #2c6459);
}
.kbar [command-kbar-open-trigger] {
  display: flex;
  align-items: center;
  color: var(--gray12);
}
.kbar [command-kbar-subcommand-trigger] {
  display: flex;
  align-items: center;
  gap: 4px;
  right: 8px;
  bottom: 8px;
}
.kbar [command-kbar-subcommand-trigger] svg {
  width: 14px;
  height: 14px;
}
.kbar [command-kbar-subcommand-trigger] hr {
  height: 100%;
  background: var(--gray6);
  border: 0;
  width: 1px;
}
.kbar [command-kbar-subcommand-trigger][aria-expanded="true"],
.kbar [command-kbar-subcommand-trigger]:hover {
  background: var(--gray4);
}
.kbar [command-kbar-subcommand-trigger][aria-expanded="true"] kbd,
.kbar [command-kbar-subcommand-trigger]:hover kbd {
  background: var(--gray7);
}
.kbar [command-separator] {
  height: 1px;
  width: 100%;
  margin: 4px 0;
  @apply bg-gray-100;
}
.kbar * + [command-group] {
  margin-top: 8px;
}
.kbar [command-group-heading] {
  user-select: none;
  font-size: 12px;
  color: var(--gray11);
  padding: 0 8px;
  display: flex;
  align-items: center;
}
.kbar [command-dialog-footer] {
  display: flex;
  flex-direction: row;
  height: 40px;
  align-items: center;
  width: 100%;
  position: absolute;
  background: var(--gray1);
  bottom: 0;
  padding: 8px;
  border-top: 1px solid var(--gray6);
  border-radius: 0 0 12px 12px;
}
.kbar [command-dialog-footer] svg {
  width: 20px;
  height: 20px;
  filter: grayscale(1);
  margin-right: auto;
}
.kbar [command-dialog-footer] hr {
  height: 12px;
  width: 1px;
  border: 0;
  background: var(--gray6);
  margin: 0 4px 0px 12px;
}
@media (prefers-color-scheme: dark) {
  .kbar [command-dialog-footer] {
    background: var(--gray2);
  }
}
.kbar [command-popover] {
  z-index: var(--layer-portal);
  position: fixed;
  left: 50%;
  top: var(--page-top);
  transform: translateX(-50%);
}
.kbar [command-popover] [command] {
  width: 640px;
  transform-origin: center center;
  animation: dialogIn var(--transition-fast) forwards;
}
.kbar [command-popover][data-state="closed"] [command] {
  animation: dialogOut var(--transition-fast) forwards;
}
.kbar [command-empty] {
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  white-space: pre-wrap;
  color: var(--gray11);
}
@keyframes loading {
  0% {
    opacity: 0;
    transform: translateX(0);
  }
  50% {
    opacity: 1;
    transform: translateX(100%);
  }
  100% {
    opacity: 0;
    transform: translateX(0);
  }
}
@keyframes shine {
  to {
    background-position: 200% center;
    opacity: 0;
  }
}
@keyframes border {
  to {
    box-shadow: 0 0 0 1px var(--gray6);
  }
}
@keyframes showTopShine {
  to {
    opacity: 1;
  }
}
.kbar-submenu {
  animation-duration: 0.2s;
  animation-timing-function: ease;
  animation-fill-mode: forwards;
  transform-origin: var(--radix-popover-content-transform-origin);
}
.kbar-submenu [command-root] {
  display: flex;
  flex-direction: column;
  width: 320px;
  border: 1px solid var(--gray6);
  background: var(--gray2);
  border-radius: 8px;
}
.kbar-submenu [command-list] {
  padding: 8px;
  overflow: auto;
  overscroll-behavior: contain;
  transition: 100ms ease;
  transition-property: height;
}
.kbar-submenu [command-item] {
  height: 40px;
  cursor: pointer;
  height: 40px;
  border-radius: 8px;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 8px;
  color: var(--gray12);
  user-select: none;
  will-change: background, color;
  transition: all 150ms ease;
  transition-property: none;
}
.kbar-submenu [command-item][aria-selected="true"] {
  background: var(--gray5);
  color: var(--gray12);
  @apply bg-gray-300;
}
.kbar-submenu [command-item][aria-selected="true"] [command-kbar-submenu-shortcuts] kbd {
  background: var(--gray7);
}
.kbar-submenu [command-item][aria-disabled="true"] {
  color: var(--gray8);
  cursor: not-allowed;
}
.kbar-submenu [command-item] svg {
  width: 16px;
  height: 16px;
}
.kbar-submenu [command-item] [command-kbar-submenu-shortcuts] {
  display: flex;
  margin-left: auto;
  gap: 2px;
}
.kbar-submenu [command-item] [command-kbar-submenu-shortcuts] kbd {
  background: var(--gray5);
  color: var(--gray11);
  height: 20px;
  width: 20px;
  border-radius: 4px;
  padding: 0 4px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.kbar-submenu [command-item] [command-kbar-submenu-shortcuts] kbd:first-of-type {
  margin-left: 8px;
}
.kbar-submenu [command-group-heading] {
  text-transform: capitalize;
  font-size: 12px;
  color: var(--gray11);
  font-weight: 500;
  margin-bottom: 8px;
  margin-top: 8px;
  margin-left: 4px;
}
.kbar-submenu [command-input] {
  padding: 12px;
  border: 0;
  border-top: 1px solid var(--gray6);
  font-size: 13px;
  background: transparent;
  margin-top: auto;
  width: 100%;
  outline: 0;
  border-radius: 0;
}
.kbar-submenu[data-state="open"] {
  animation-name: slideIn;
}
.kbar-submenu[data-state="closed"] {
  animation-name: slideOut;
}
.kbar-submenu [command-empty] {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  white-space: pre-wrap;
  font-size: 14px;
  color: var(--gray11);
}
@keyframes slideIn {
  0% {
    opacity: 0;
    transform: scale(0.96);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes slideOut {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.96);
  }
}
@media (max-width: 640px) {
  .kbar [command-input] {
    font-size: 16px;
  }
}
</style>
