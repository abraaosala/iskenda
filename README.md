# IS KENDA — Consultoria & Academia

Site institucional da **IS KENDA CONSULTORIA & ACADEMIA**, uma empresa angolana de consultoria empresarial e formação profissional.

Construído com **React 19 + TypeScript + Vite 6 + Tailwind CSS v4**.

## Funcionalidades

- Apresentação institucional (missão, visão, valores, equipa)
- Consultoria: Contabilidade, Fiscalidade Tributária, Gestão de RH, Organização Administrativa
- **Simulador interativo de honorários** — estimativa mensal (Kz) baseada no porte da empresa e serviços
- **IS KENDA Academia** — cursos, módulos e modalidades de formação
- Portfolio de clientes
- Galeria de fotos
- Formulário de contacto

## Tecnologias

| Tecnologia | Versão |
|---|---|
| React | ^19.0.1 |
| TypeScript | ~5.8.2 |
| Vite | ^6.2.3 |
| Tailwind CSS | ^4.1.14 |
| Motion | ^12.23.24 |
| Lucide React | ^0.546.0 |

## Scripts

```sh
npm run dev      # Dev server em localhost:3000
npm run build    # Build de produção
npm run preview  # Preview do build
npm run lint     # Type-check (tsc --noEmit)
npm run clean    # Limpa dist/ e server.js
```

## Estrutura

```
src/
  main.tsx            — Entrypoint
  App.tsx             — Orquestrador de secções (scroll-based, sem React Router)
  index.css           — Tailwind v4 + tema customizado
  data.ts             — Todo o conteúdo editável (serviços, clientes, cursos, etc.)
  types.ts            — Interfaces TypeScript
  components/         — 13 componentes (Navbar, Hero, About, Team, Values, Services, Pricing, Academy, Clients, Gallery, Contact, Footer, SmartIcon)
  assets/images/      — Imagens estáticas
```

O conteúdo é **data-driven** — edite `src/data.ts` para alterar textos, ícones (nomes Lucide React) e informações.

## Desenvolvimento

1. `npm install`
2. Definir `GEMINI_API_KEY` em `.env.local` (para funcionalidades Gemini AI)
3. `npm run dev`

## Licença

Proprietário — IS KENDA CONSULTORIA & ACADEMIA
