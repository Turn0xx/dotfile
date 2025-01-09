return {
    'phaazon/hop.nvim',
  branch = 'v2', -- optional but strongly recommended

  opts = {
    keys = 'etovxqpdygfblzhckisuran',
    case_insensitive = false,
    multi_windows = true,
  },


  keys = {
      { "<leader><leader>f", "<cmd>HopChar1CurrentLine<cr>" , desc = "Find in line"},
      { "s", "<cmd>HopChar1AC<cr>" , desc = "Search in buffer after cursor"},
      { "S", "<cmd>HopChar1BC<cr>" , desc = "Search in buffer before cursor"},

  },

  enabled=true
}
