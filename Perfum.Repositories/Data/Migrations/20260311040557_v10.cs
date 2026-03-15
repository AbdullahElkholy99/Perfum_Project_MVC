using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Perfum.Repositories.Data.Migrations
{
    /// <inheritdoc />
    public partial class v10 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_ShippingAddress_shippingAddressId",
                table: "Orders");

            migrationBuilder.RenameColumn(
                name: "shippingAddressId",
                table: "Orders",
                newName: "ShippingAddressDetailsId");

            migrationBuilder.RenameIndex(
                name: "IX_Orders_shippingAddressId",
                table: "Orders",
                newName: "IX_Orders_ShippingAddressDetailsId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_ShippingAddress_ShippingAddressDetailsId",
                table: "Orders",
                column: "ShippingAddressDetailsId",
                principalTable: "ShippingAddress",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_ShippingAddress_ShippingAddressDetailsId",
                table: "Orders");

            migrationBuilder.RenameColumn(
                name: "ShippingAddressDetailsId",
                table: "Orders",
                newName: "shippingAddressId");

            migrationBuilder.RenameIndex(
                name: "IX_Orders_ShippingAddressDetailsId",
                table: "Orders",
                newName: "IX_Orders_shippingAddressId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_ShippingAddress_shippingAddressId",
                table: "Orders",
                column: "shippingAddressId",
                principalTable: "ShippingAddress",
                principalColumn: "Id");
        }
    }
}
