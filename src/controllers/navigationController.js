export async function getShoppingCart(req, res) {
    const user = res.locals.user;
    res.status(200).send(`olá, ${user.name}! Você está logado, e essa é a página com o seu carrinho de compras!`);
}