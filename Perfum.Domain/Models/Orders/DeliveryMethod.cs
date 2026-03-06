namespace Perfum.Domain.Models.Orders;

public class DeliveryMethod
{
    public DeliveryMethod()
    {

    }
    public DeliveryMethod(string name, decimal price, string deliveryTime, string description)
    {
        Name = name;
        Price = price;
        DeliveryTime = deliveryTime;
        Description = description;
    }
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public string DeliveryTime { get; set; }
    public string Description { get; set; }
}
public class ShippingAddress
{
    public ShippingAddress()
    {

    }
    public ShippingAddress(string firstName, string lastName, string city, string zipCode, string street, string state)
    {
        FirstName = firstName;
        LastName = lastName;
        City = city;
        ZipCode = zipCode;
        Street = street;
        State = state;
    }
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string City { get; set; }
    public string ZipCode { get; set; }
    public string Street { get; set; }
    public string State { get; set; }
}