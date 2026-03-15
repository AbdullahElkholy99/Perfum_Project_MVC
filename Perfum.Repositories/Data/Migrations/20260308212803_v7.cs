using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Perfum.Repositories.Data.Migrations
{
    /// <inheritdoc />
    public partial class v7 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_ShippingAddress_shippingAddressId",
                table: "Orders");

            migrationBuilder.AlterColumn<int>(
                name: "shippingAddressId",
                table: "Orders",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_ShippingAddress_shippingAddressId",
                table: "Orders",
                column: "shippingAddressId",
                principalTable: "ShippingAddress",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_ShippingAddress_shippingAddressId",
                table: "Orders");

            migrationBuilder.AlterColumn<int>(
                name: "shippingAddressId",
                table: "Orders",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_ShippingAddress_shippingAddressId",
                table: "Orders",
                column: "shippingAddressId",
                principalTable: "ShippingAddress",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
