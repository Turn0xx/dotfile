return {

   "zbirenbaum/copilot.lua",
      cmd = "Copilot",
    lazy = true,
      build = ":Copilot auth",
      opts = {
        suggestion = { enabled = true , auto_trigger = true, accept_word = "<M-w>" },
        panel = { enabled = false },
        filetypes = {
          markdown = true,
          help = true,
          typescript = true,
        },
      },
}
