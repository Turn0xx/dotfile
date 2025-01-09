return function(_, opts)
  require("mason-lspconfig").setup(opts)
  -- require("mason-lspconfig").setup_handlers({
		-- 		function(server_name) -- default handler (optional)
		-- 			-- https://github.com/neovim/nvim-lspconfig/pull/3232
		-- 			if server_name == "ts_ls" then
		-- 				server_name = "tsserver"
		-- 			end
		-- 			local capabilities = require("cmp_nvim_lsp").default_capabilities()
		-- 			require("lspconfig")[server_name].setup({
		-- 				capabilities = capabilities,
		-- 			})
		-- 		end,
  -- })
  --
  require("astronvim.utils").event "MasonLspSetup"
end
