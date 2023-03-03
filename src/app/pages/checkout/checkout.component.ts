import { OrdersService } from './../../orders.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup: FormGroup;
  orderData: any;

  totalPrice: number;
  totalQuantity: number;

  creditCardYears: number[];
  creditCardMonths: number[];
  // firstName: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService,
    private ordersService: OrdersService
  ) {
    this.totalPrice = 0;
    this.totalQuantity = 0;
    this.creditCardMonths = [];
    this.creditCardYears = [];
  }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: [''],
      }),
    });

    // populate credit card months

    const startMonth = new Date().getMonth() + 1;
    console.log('startMonth: ' + startMonth);
    this.formService.getCreditCardMonths(startMonth).subscribe((data) => {
      console.log('Retrieve credit card months: ' + JSON.stringify(data));
      this.creditCardMonths = data;
    });
    // populate credit card years
    this.formService.getCreditCardYears().subscribe((data) => {
      console.log('Retrieve credit card years: ' + JSON.stringify(data));
      this.creditCardYears = data;
    });
  }

  getFirstName() {
    return this.checkoutFormGroup.get('customer.firstName');
  }
  getLastName() {
    return this.checkoutFormGroup.get('customer.lastName');
  }
  getEmail() {
    return this.checkoutFormGroup.get('customer.email');
  }

  copyShippingAddressToBillingAddress(event) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress'].setValue(
        this.checkoutFormGroup.controls['shippingAddress'].value
      );

      // bug fix for states
      // this.billingAddressStates = this.shippingAddressStates;
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();

      // bug fix for states
      // this.billingAddressStates = [];
    }
  }

  onSubmit() {
    console.log('Handling submit button');
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched;
    }

    console.log(this.checkoutFormGroup.get('customer').value);
    console.log(this.checkoutFormGroup.get('shippingAddress').value);

    // console.log(
    //   'The email address is: ' +
    //     this.checkoutFormGroup.get('customer').value.email
    // );
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(
      creditCardFormGroup.value.expirationYear
    );
    console.log(selectedYear);
    // if the current year equals selected year, then start with the current month

    let startMonth: number;
    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }

    this.formService.getCreditCardMonths(startMonth).subscribe((data) => {
      console.log('Retrieve credit card months: ' + JSON.stringify(data));
      this.creditCardMonths = data;
    });
  }

  placeOrder(orderData) {
    this.ordersService.placeOrder(orderData).subscribe((res) => {
      alert('Your order has been placed.');
      this.checkoutFormGroup.reset;
    });
  }
}
