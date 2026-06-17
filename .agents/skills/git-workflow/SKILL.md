---
name: git-workflow
description: "Apply this skill whenever making any code change — fix, feat, or chore. It enforces branch-per-task workflow: create a feature branch, commit atomically, push, and open a PR. Do not commit directly to main/master unless it's a trivial hotfix approved by the user."
license: MIT
metadata:
  author: iskenda
---

# Git Workflow

## Branch Naming

Create a new branch for each logical change. Use the appropriate prefix:

| Prefix  | When to use |
|---------|-------------|
| `fix/`  | Bug fixes, validation errors, hotfixes |
| `feat/` | New features, new endpoints, new components |
| `chore/`| Maintenance: deps, config, tooling, CI, refactors without behavior change |

Name format: `<prefix>/<breve-descricao-em-kebab-case>`

Exemplos:
- `fix/favicon-validation`
- `feat/contact-form`
- `chore/update-deps`

## Workflow

1. **Criar branch:** `git checkout -b <tipo>/<descricao>`
2. **Fazer alterações** com commits atômicos e mensagens claras
3. **Rodar lint:** `npm run lint` (se alterou TypeScript)
4. **Commit:**
   - Mensagem curta e descritiva: `fix: remove image rule from favicon validation`
   - Usar conventional commits: `fix:`, `feat:`, `chore:`
5. **Push:** `git push -u origin <branch>`
6. **Finalizar:** Perguntar ao usuário se deseja abrir PR (`gh pr create`) ou fazer merge.

## Regras

- Nunca commitar diretamente na `main` sem autorização
- Uma branch = **uma** alteração lógica
- Deletar a branch após o merge
- Se o usuário pedir múltiplas alterações não relacionadas, criar branches separadas
