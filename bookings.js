document.addEventListener('DOMContentLoaded', () => {
  const searchBox = document.getElementById('searchBox');
  const newBookingsBtn = document.getElementById('newBookingsBtn');
  const bookingsTable = document.getElementById('bookingsTable');
  const customerNames = document.getElementById('customerNames');
  const vehicleRegister = document.getElementById('Vehicle Register');
  const startDate = document.getElementById('startDate');
  const endDate = document.getElementById('endDate');

  // Filter function to search through bookings
  function filterBookings() {
      const searchText = searchBox.value.toLowerCase();
      const customerName = customerNames.value.toLowerCase();
      const vehicleReg = vehicleRegister.value.toLowerCase();
      const start = startDate.value;
      const end = endDate.value;

      const rows = bookingsTable.querySelectorAll('tbody tr');

      rows.forEach(row => {
          const cells = row.getElementsByTagName('td');
          const title = cells[1].textContent.toLowerCase();
          const customer = cells[2].textContent.toLowerCase();
          const vehicle = cells[3].textContent.toLowerCase();
          const date = cells[4].textContent;

          const matchesSearch = title.includes(searchText) || customer.includes(searchText) || vehicle.includes(searchText);
          const matchesCustomer = customerName ? customer.includes(customerName) : true;
          const matchesVehicle = vehicleReg ? vehicle.includes(vehicleReg) : true;
          const matchesDate = (!start || date >= start) && (!end || date <= end);

          if (matchesSearch && matchesCustomer && matchesVehicle && matchesDate) {
              row.style.display = '';
          } else {
              row.style.display = 'none';
          }
      });
  }

  // Event listeners for the filter inputs
  searchBox.addEventListener('input', filterBookings);
  customerNames.addEventListener('change', filterBookings);
  vehicleRegister.addEventListener('change', filterBookings);
  startDate.addEventListener('change', filterBookings);
  endDate.addEventListener('change', filterBookings);

  // Example function to handle adding a new booking
  newBookingsBtn.addEventListener('click', () => {
      const newRow = bookingsTable.insertRow(-1);
      newRow.innerHTML = `
          <td>3</td>
          <td>New Booking</td>
          <td>Customer Name</td>
          <td>Vehicle Register Number</td>
          <td>2024-09-01</td>
          <td>Note about the booking</td>
          <td>
              <button class="editBtn">Edit</button>
              <button class="deleteBtn">Delete</button>
          </td>
      `;

      // Re-add event listeners to new buttons
      addRowEventListeners(newRow);
  });

  // Function to add event listeners to each row's buttons
  function addRowEventListeners(row) {
      const editBtn = row.querySelector('.editBtn');
      const deleteBtn = row.querySelector('.deleteBtn');

      editBtn.addEventListener('click', () => {
          alert('Edit functionality to be implemented.');
      });

      deleteBtn.addEventListener('click', () => {
          row.remove();
      });
  }

  // Initialize event listeners for the existing rows
  const rows = bookingsTable.querySelectorAll('tbody tr');
  rows.forEach(row => addRowEventListeners(row));
});