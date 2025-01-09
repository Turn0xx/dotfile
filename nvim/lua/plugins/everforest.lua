
return {

  "neanias/everforest-nvim",
  version = false,
  lazy = false,
  priority = 1000, -- make sure to load this before all the other start plugins
  -- Optional; default configuration will be used if setup isn't called.
  config = function()
    require("everforest").setup({
      -- Your config here
      --

      background = "hard", -- or "hard"
      contrast = "low", -- or "high"
      -- Set to "true" if you want to invert the selection
      invert_selection = false,
    })
  end,
}
