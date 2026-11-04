# Paberseg – Site institucional

Site estático (HTML, CSS e JavaScript puro) da **Paberseg – Gestão em Saúde e Segurança do Trabalho**, Birigui/SP.

## Estrutura

```
index.html      → página única com todas as seções
css/style.css   → estilos (cores no topo, em :root)
js/main.js      → menu mobile, filtro de serviços, animações e formulário → WhatsApp
assets/logo.svg → logotipo (provisório)
.nojekyll       → evita o processamento Jekyll no GitHub Pages
```

## Antes de publicar – confirmar com o proprietário

- **WhatsApp:** altere `WHATSAPP_NUMBER` no topo de `js/main.js` (hoje está o telefone fixo do cadastro na Receita).
- **Telefone, endereço e CNPJ:** em `index.html` (seção Contato e rodapé). Os dados atuais vêm do cadastro público do CNPJ 47.915.033/0001-25.
- **Horário de atendimento**, e-mail e redes sociais (se houver).
- **Lista de serviços e treinamentos:** remover o que a empresa não oferece.
- **Logotipo:** substituir `assets/logo.svg` pelo logo oficial, se existir.

## Visualizar localmente

Abra o `index.html` no navegador ou rode `python3 -m http.server` e acesse http://localhost:8000.

## Publicar no GitHub Pages

1. No GitHub, abra **Settings → Pages**.
2. Em *Build and deployment*, escolha **Deploy from a branch**.
3. Selecione o branch com o site (ex.: `main`) e a pasta **/ (root)** e salve.
4. Em alguns minutos o site fica disponível em `https://<usuario>.github.io/<repositorio>/`.
